/*{const express = require('express')
const { error } = require('console')
const bodyParser = require('body-parser')
const mysql = require('mysql');
//const { errorMonitor } = require('events');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users'
})

db.connect(err =>{
    if(err){
        throw err
    }
    console.log('MySQL Connected')
})

const app = express();

//for css
app.use(express.static(__dirname))

//use body parser - interact with html data
app.use(bodyParser.urlencoded({ extended: true}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/adduser', (req, res) => {
    
    let table = 'CREATE TABLE IF NOT EXISTS users (id int AUTO_INCREMENT, name VARCHAR (255), password VARCHAR (255), email VARCHAR (255), PRIMARY KEY(id))'
    db.query(table, err => {
        if(err){
        throw err
        }
        //console.log('users table created')
    })

    var username = req.body.userlogin;
    var useremail = req.body.useremail;
    var userpassword = req.body.userpassword;

    let post = {name: username , password: userpassword, email: useremail}
    let sql = 'INSERT INTO users SET ?'
    let query = db.query(sql,post, err => {
        if(err){
            throw err
        }
        res.sendFile(__dirname + "/account-page.html")
    })
    
})

/*app.post('/check/:id', async(req, res) => {
    const checkname = req.body.checkname;
    const checkpassword = req.body.checkpassword;
    
    let sql = `SELECT name,password FROM users WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        console.log(results)
    });
});*/
/*
app.listen(3000, ()=>{
    console.log("Running on port 3000")
})}*/

//console.log('hello world')//const http = require('http')

const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')
//const { errorMonitor } = require('events')
const bcrypt = require("bcrypt")
//const { error } = require('console')




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

let table = 'CREATE TABLE IF NOT EXISTS users (id int AUTO_INCREMENT, name VARCHAR (255), password VARCHAR (255), email VARCHAR (255), PRIMARY KEY(id))'
    db.query(table, err => {
        if(err){
        throw err
        }
        console.log('users table created')
});

const app = express();
app.use(cors());
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

/*async function checkEmailFunction(emailTry) {
    let checkEmail = 'SELECT email FROM users'
    const index = db.query(checkEmail, (err, results) => {
        if (err) {
            throw err;
        }
        console.log("emails are: " , results)
        //console.log(results[0].email)
        if(results){
            results.forEach((element) => {
                //console.log(element)
                if(email === element.email){
                    console.log('found')
                    throw err
                }
                else{
                    console.log('free email') 
                }
            })
        }
    }); 
    return true
}*/

//registrating user - adding him to database (input checks: no, hashing: yes))
app.post('/add', (req,res) => { 
    console.log('success')
    
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    let emailChekckCall = `SELECT email FROM users`
    db.query(emailChekckCall, (error, results) => {
        if(error){
            throw error
        }
        console.log('results are: ', results)
        console.log(results[0].email)

        results.forEach((element) => {
            console.log(element);
            if(element.email === email){
                console.log(element)
                console.log('found matching email')
                return res.status(409).json({ error: 'email in use' });
            }
            else{
                console.log('free email')
            }
        })
    })

    //handling hashing
    
    Hashing(password)
        .then((newHashedPassword) => {
            console.log(newHashedPassword)
            //initialization of the post object ---> inserting into mysql table with post
            let post = {name: name , password: newHashedPassword, email: email}
            
            //mysql syntax for inserting
            let sql = 'INSERT INTO users SET ?'
            db.query(sql,post, err => {
                if(err){
                    throw err;
                }
                console.log('user added!')
            })
            //res.status(201)
        })
        .catch((error) => {
            console.error(error);
            return res.status(409).json({ error: 'hashing error' });
        })    
})

/*const emailTry = 'user@gmail.com'

let checkEmail = 'SELECT email FROM users'
db.query(checkEmail, (err, results) => {
    if (err) {
        throw err;
    }
    //console.log("emails are: " , results)
    //console.log(results[0].email)
    results.forEach((element) => {
        //console.log(element)
        if(emailTry === element.email){
            console.log('found')
        }
        else{
            console.log('free email')
            //res.status(404)
        }
    })
});*/
//console.log(checkEmail)
//додай функцію РОЗХЕШУВАННЯ вже у самому алгоритмі автентифікації користувача
//Done додай перевірку на НЕ ІДЕНТИЧНІСТЬ пошт - праолі і імена не чіпай, вони можуть повторюватись

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
  
