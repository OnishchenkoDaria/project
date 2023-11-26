const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')
//const { errorMonitor } = require('events')
const bcrypt = require("bcrypt")
//const { error } = require('console')
const sessions = require('express-session');

//header("Access-Control-Allow-Origin: http://localhost:5173");
//creating our mysql database + connecting it with node (next function)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users'
})

db.connect(err => {
    if (err) {
        console.error('MySQL Connection Error:', err);
        throw err;
    }
    console.log('MySQL Connected');
});

//old version: CREATE TABLE IF NOT EXISTS users (id int AUTO_INCREMENT, name VARCHAR (255), password VARCHAR (255), email VARCHAR (255) UNIQUE, PRIMARY KEY(id))
let table = 'CREATE TABLE IF NOT EXISTS users (id int AUTO_INCREMENT, name VARCHAR (255), password VARCHAR (255), email VARCHAR (255), PRIMARY KEY(id))'
    db.query(table, err => {
        if(err){
        throw err
        }
        console.log('users table created')
});

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,  // enable passing cookies, authorization headers, etc.
    methods: 'GET, POST, PUT, DELETE',  // allow specified HTTP methods
    allowedHeaders: 'Content-Type, *',  // allow specified headers
};
app.use(cors(corsOptions));

//session implementation
const crypto = require('crypto');

const generateSecretKey = () => {
  return crypto.randomBytes(64).toString('hex');
};

//console.log(generateSecretKey());

app.use(
    sessions({
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 //for 24 hours
        },
        secret:generateSecretKey(),
        resave: true,
        saveUninitialized: false,
    })
)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get('/', (req,res) => {
   res.send('<h1>Works</h1>')
})

//asynchronious function for hashing passwords (returns promise ---> handle with .then)
async function Hashing(originalPassword) {
    const saltRounds = 10
    return bcrypt.hash(originalPassword, saltRounds)
    .then((hashedPassword) => {
            return hashedPassword
        })

    //catching errors
    .catch((err) => {
        throw err
    })
}

function deleteUserString(email){
    let sql = `DELETE FROM users WHERE email = '${email}'`
    db.query(sql, (err)=>{
        if(err){
            console.log('delete wrong registration error')
            throw err
        }
        console.log('delete wrong registration success')
    })

}

//try to refactor it in further
app.post('/add', (req,res) => {
    if(req.session.user){
        console.log('an active session is going')
        return res.status(409).json({ error: 'an active session exist' });
    }
    console.log('success')
    
    const name = req.body.username
    const email = req.body.useremail
    const password = req.body.userpassword

    // mysql syntax meaning : finding a matching email in the table with the recieved email
    const checkEmailQuery = `SELECT * FROM users WHERE email = '${email}'`;
    db.query(checkEmailQuery, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'server error' });
        }
        // if found => result of matching search is not zero but email(s)
        if (result.length > 0) {
            return res.status(409).json({ error: 'email in use' });
        }
   
    //handling hashing
    
    Hashing(password)
        .then((newHashedPassword) => {
            console.log(newHashedPassword)
            //initialization of the post object ---> inserting into mysql table with post
            let post = {name: name , password: newHashedPassword, email: email}
            
            //mysql syntax for inserting
            let sql = 'INSERT INTO users SET ?'
            db.query(sql,post, (err) => {
                if(err){
                    throw err
                }
                //success case
                console.log('user added!')
                req.session.user = post.name
                if(post.email === 'admin@gmail.com'){
                    req.session.role = 'admin'
                } else {
                    req.session.role = 'user'
                               }
                               
                res.status(201).json({ message: 'user added' });
            })
        })
        .catch((error) => {
            console.error(error);
            return res.status(500).json({ error: 'server error' });
        })
    })  

})

async function isMatch(FoundPassword, found, res, req){
    console.log("FoundPassword: ", FoundPassword , "found.password: ",found.password)
    try{
        //the order of input into bcrypt matters!
        // 1st - not hashed password (from user input) , 2nd - hashed (from db)
        const Match = await bcrypt.compare(FoundPassword, found.password)
        console.log(Match)
        if(Match === true){
            req.session.user = found.name
            //replace with Nastya's email further
            if(found.email === 'admin@gmail.com'){
                req.session.role = 'admin'
            } else{
                req.session.role = 'user'
            }
           
            return res.status(201).json({ message: 'login passed' })
        }
        else{
            //if passwords did not match
            return res.status(409).json({ error: 'login failed' });
        }
    } 
    catch(err){
        console.log("alert!")
        console.error(err)
        return res.status(500).json({ error: 'server error' })
    }
}

app.post('/log-in', (req,res) => {
    if(req.session.user){
        console.log('an active session is going')
        return res.status(409).json({ error: 'an active session exist' });
    }
    console.log('login enter success')
    const email = req.body.useremail
    const password = req.body.userpassword

    const checkEmailQuery = `SELECT * FROM users WHERE email = '${email}'`;
        db.query(checkEmailQuery, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'server error' });
            }
            //if no email in db matched
            if(result.length === 0){
                return res.status(409).json({ error: 'email not found' });
            }
            //converting data propely into json format
            var string=JSON.stringify(result);
            var json =  JSON.parse(string)
            console.log(json)
           // const found = json[0].password
            console.log("1: ", password , "2: " , json[0].password,) 
            isMatch(password, json[0], res, req)
        })
})

app.get('/user', (req,res)=> {
    const user = req.session.user
    const role = req.session.role 
    console.log("user: " , user)
    console.log("role: " , role)
    res.json(({user , role }) || null)
})

app.post('/log-out', (req, res) => {
    if(!req.session.user){
        return res.status(409).json({ error: 'no active session to be shut' });
    } else{
        req.session.destroy((err) => {
            if (err) {
            return res.status(500).json({ error: 'Error destroying session' });
            }
            //console.log('Logged out');
            return res.status(200).json({ message: 'session shut' })
        });
    }
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})