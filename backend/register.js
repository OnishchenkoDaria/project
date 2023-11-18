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
const { error } = require('console')
const { errorMonitor } = require('events');
//const { error } = require('console')

const app = express();
app.use(cors());
//app.use(express.json());
app.use(bodyParser.json());

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


app.get('/', (req,res) => {
   res.send('<h1>Works</h1>')
})

app.post('/add', (req,res) => { 
    console.log('success')
    //console.log(req.body.name, req.body.email, req.body.password)
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    let table = 'CREATE TABLE IF NOT EXISTS users (id int AUTO_INCREMENT, name VARCHAR (255), password VARCHAR (255), email VARCHAR (255), PRIMARY KEY(id))'
    db.query(table, err => {
        if(err){
        throw err
        }
        //console.log('users table created')
    })

    let post = {name: name , password: email, email: password}
    let sql = 'INSERT INTO users SET ?'
    let query = db.query(sql,post, err => {
        if(err){
            throw err
        }
        res.send('<p>user added</p>')
    })

})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
  
