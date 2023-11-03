const express = require('express')
const bodyParser = require('body-parser')
const app = express();

app.listen(3000, ()=>{
    console.log("Running on port 3000")
})

//for css
app.use(express.static(__dirname))

//use body parser - interact with html data
app.use(bodyParser.urlencoded({ extended: true}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/INDEX.html')
})

app.post('/adduser', (req, res) => {
    var username = req.body.userlogin;
    var useremail = req.body.useremail;

    //res.send("Hello " + username + ", thank you for subcribing. Your email is " + useremail)
    res.sendFile(__dirname + "/account-page.html")
})

