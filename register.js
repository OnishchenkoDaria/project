const express = require('express')
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
    if(!db){
        db.query('CREATE DATABASE users', err => {
            if(err){
                throw err
            }
            console.log('Database created')
        }) 
        
        let sql = 'CREATE TABLE users (id int AUTO_INCREMENT, name VARCHAR (255), password VARCHAR (255), email VARCHAR (255), PRIMARY KEY(id))'
            db.query(sql, err => {
                if(err){
                    throw err
                }
                console.log('users table created')
            })
    }
    else{
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
    }
    
})

app.listen(3000, ()=>{
    console.log("Running on port 3000")
})