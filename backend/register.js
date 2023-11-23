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

//old version: CREATE TABLE IF NOT EXISTS users (id int AUTO_INCREMENT, name VARCHAR (255), password VARCHAR (255), email VARCHAR (255) UNIQUE, PRIMARY KEY(id))
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

//registrating user - adding him to database (input checks: no, hashing: yes))
app.post('/add', (req,res) => { 
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
                res.status(201).json({ message: 'user added' });
            })
            //res.status(201)*/
        })
        .catch((error) => {
            console.error(error);
            return res.status(500).json({ error: 'server error' });
        })
    })  

})


//додай функцію РОЗХЕШУВАННЯ вже у самому алгоритмі автентифікації користувача


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})