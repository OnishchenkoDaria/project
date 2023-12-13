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

//orders table
let orders = 'CREATE TABLE IF NOT EXISTS orders (id int AUTO_INCREMENT, price VARCHAR (255), email VARCHAR (255), date VARCHAR (255), PRIMARY KEY(id))'
    db.query(orders, err => {
        if(err){
        throw err
        }
        console.log('orders table created')
});


//adding admain user by default with data from unttracked credentails
const credentials = require('./credentials')

const AdminUsername = credentials.username
const AdminPassword = credentials.password
const AdminEmail = credentials.email

const checkEmpty = `SELECT COUNT(*) AS count FROM users`
db.query(checkEmpty, (queryErr, results)=> {
    if(queryErr){
        console.error('Error executing query ', queryErr)
    } else{
        const rowCount = results[0].count
        if(rowCount === 0){
            Hashing(AdminPassword)
            .then((newHashed) => {
               // console.log(newHashed)
                const insertAdmin = 'INSERT INTO users (name, password, email) VALUES (?, ?, ?)'
                const values = [AdminUsername, newHashed, AdminEmail];
                db.query(insertAdmin, values, (insertErr, results)=> {
                    if (insertErr) {
                        console.error('Error inserting user:', insertErr)
                    } else {
                        console.log(`User inserted`)
                    }
                })
            })
            .catch((error) => {
                console.error(error);
                return res.status(500).json({ error: 'server error' });
            })
        } else {
            console.log('admin user was already added before')
        }
    }
})

const registerRouter = express.Router();

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,  // enable passing cookies, authorization headers, etc.
    methods: 'GET, POST, PUT, DELETE',  // allow specified HTTP methods
    allowedHeaders: 'Content-Type, *',  // allow specified headers
};
registerRouter.use(cors(corsOptions));

//session implementation || future data hash
const crypto = require('crypto');

const generateSecretKey = () => {
  return crypto.randomBytes(64).toString('hex');
};

//console.log(generateSecretKey());

registerRouter.use(
    sessions({
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 //for 24 hours
        },
        secret:generateSecretKey(),
        resave: true,
        saveUninitialized: false,
    })
)
registerRouter.use(express.json());
registerRouter.use(express.urlencoded({ extended: true }));

registerRouter.use(bodyParser.json());

registerRouter.get('/', (req,res) => {
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
registerRouter.post('/add', (req,res) => {
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
                req.session.email = post.email
                if(post.email === AdminEmail){
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
            req.session.email = found.email
            //replace with Nastya's email further
            if(found.email === AdminEmail){
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

registerRouter.post('/log-in', (req,res) => {
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

registerRouter.get('/user', (req,res)=> {
    const user = req.session.user
    const role = req.session.role 
    console.log("user: " , user)
    console.log("role: " , role)
    res.json(({user , role }) || null)
})


registerRouter.post('/session-hook', (req, res) => {
    const userName = req.session.user
    console.log(userName)
    if(!req.session.user){
        return res.status(409).json({ error: 'no active session, redirect' })
    }
    else{
        return res.status(200).json(userName)
    }
})

registerRouter.get('/get-role', (req, res) => {
    const role = req.session.role
    res.json(role)
})

registerRouter.post('/log-out', (req, res) => {
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

const keys = require('./be-keys')
const { error } = require('console')

registerRouter.addPayment = (price) => {
    const date = new Date()
    const day = date.toLocaleDateString('en-ca', {hour12:false})
    const time = date.toLocaleTimeString('en-US', {hour12:false})
    const Today = day+' '+time
    console.log(Today)
    let post = {price: price, email:user_email, date: Today}
    let sql = `INSERT INTO orders SET ?`
    db.query(sql,post, (err)=>{
        if (err) {
            return res.status(500).json({ error: 'server error' });
        }
        console.log('payment added!')
    })
}

registerRouter.post('/get-table', (req,res)=>{
    if(!req.session.user){
        return res.status(409).json({ error: 'no active session' });
    } else{
        const email = req.session.email
        console.log(email)
        let sql = `SELECT * FROM orders WHERE email ='${email}'`
        db.query(sql, (err, result)=>{
            if (err) {
                return res.status(500).json({ error: 'server error' });
            }
            console.log(result)
            return res.status(200).json(result);
        })    
    }
})

var user_email=''

registerRouter.post('/hashing', (req, res) => {
    if(!req.session.user){
        return res.status(409).json({ error: 'no active session' });
    } else{
        user_email = req.session.email
        console.log(user_email)
        const value = req.body.value
        console.log(value)
        let post = `SELECT MAX(id) AS latest_id FROM orders`
        db.query(post , (err, result) => {
            if(err){
                return res.status(500).json({ error: 'server error' })
            }
            var string = JSON.stringify(result);
            var json = JSON.parse(string)
            let latest_id = json[0].latest_id
            console.log(latest_id)
            if(latest_id === null){
                latest_id = 1
                console.log(latest_id)
            }
            else{
                latest_id = latest_id + 1
                console.log(latest_id)
            }
            
            const private_key = keys.private
            const public_key = keys.public
            const json_string = {
                "public_key": public_key,
                "version": "3",
                "action": "pay",
                "amount": value,
                "currency": "UAH",
                "description": "test",
                "order_id": latest_id,
                "result_url": "http://localhost:5173/account-page",
                "server_url": "https://ant-maximum-blindly.ngrok-free.app/"
            };

            const jsonString = JSON.stringify(json_string);
            console.log(jsonString)
            //encoding data
            const data = Buffer.from(jsonString).toString('base64')
            console.log(data)

            //encoding signature
            const sign_string = private_key + data + private_key
            console.log(sign_string)
            const hash = crypto.createHash('sha1').update(sign_string).digest('bin')
            console.log(hash)
            const signature = Buffer.from(hash).toString('base64')
            console.log(signature)
            const passData = {data: data , signature: signature}
            console.log(passData.data)
            console.log(passData.signature)
            return res.status(200).json(passData)
            })
    }

})

module.exports = registerRouter