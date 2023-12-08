const express = require('express')
const app = express()

const testRouter = require('./posts.js')
const registerRouter = require('./register.js')
app.use('/api/posts', testRouter)
app.use('/users', registerRouter)
app.use(express.urlencoded({ extended: true }))

/*const bodyParser = require('body-parser')
app.use(bodyParser.json());*/
const keys = require('./be-keys')
const private_key = keys.private
const crypto = require('crypto')

app.post('/', (req,res)=> {
   
    const Recieved = req.body
    console.log(JSON.stringify(Recieved))
    const dataRecieved = Recieved.data
    console.log('dataRecieved: ' , dataRecieved)
    const signatureRecieved = Recieved.signature
    console.log('signatureRecieved: ' , signatureRecieved)

    //const signatureRecieved = 'fSPHXUCgueQlhEIeq5H0OPtX8+A='
    //const dataRecieved = 'eyJwYXltZW50X2lkIjoyNDAxMTUyMjQ3LCJhY3Rpb24iOiJwYXkiLCJzdGF0dXMiOiJzdWNjZXNzIiwidmVyc2lvbiI6MywidHlwZSI6ImJ1eSIsInBheXR5cGUiOiJncGF5Y2FyZCIsInB1YmxpY19rZXkiOiJzYW5kYm94X2k4ODc0NTg4NzM5NiIsImFjcV9pZCI6NDE0OTYzLCJvcmRlcl9pZCI6IjAwMDc3IiwibGlxcGF5X29yZGVyX2lkIjoiM1NSSTdQU1MxNzAxOTk3ODA1Njc2ODIzIiwiZGVzY3JpcHRpb24iOiJ0ZXN0Iiwic2VuZGVyX3Bob25lIjoiMzgwNTA5ODAwMDI2Iiwic2VuZGVyX2NhcmRfbWFzazIiOiI0MTQ5NDkqMzUiLCJzZW5kZXJfY2FyZF9iYW5rIjoicGIiLCJzZW5kZXJfY2FyZF90eXBlIjoidmlzYSIsInNlbmRlcl9jYXJkX2NvdW50cnkiOjgwNCwiaXAiOiIxOTUuMTE0LjE1Ni40NiIsImFtb3VudCI6MS4wLCJjdXJyZW5jeSI6IlVBSCIsInNlbmRlcl9jb21taXNzaW9uIjowLjAsInJlY2VpdmVyX2NvbW1pc3Npb24iOjAuMDIsImFnZW50X2NvbW1pc3Npb24iOjAuMCwiYW1vdW50X2RlYml0IjoxLjAsImFtb3VudF9jcmVkaXQiOjEuMCwiY29tbWlzc2lvbl9kZWJpdCI6MC4wLCJjb21taXNzaW9uX2NyZWRpdCI6MC4wMiwiY3VycmVuY3lfZGViaXQiOiJVQUgiLCJjdXJyZW5jeV9jcmVkaXQiOiJVQUgiLCJzZW5kZXJfYm9udXMiOjAuMCwiYW1vdW50X2JvbnVzIjowLjAsIm1waV9lY2kiOiI3IiwiaXNfM2RzIjpmYWxzZSwibGFuZ3VhZ2UiOiJ1ayIsImNyZWF0ZV9kYXRlIjoxNzAxOTk3ODA1NjgwLCJlbmRfZGF0ZSI6MTcwMTk5NzgwNTk0MCwidHJhbnNhY3Rpb25faWQiOjI0MDExNTIyNDd9'
    console.log('*************here************')
    const jsonString = private_key + dataRecieved + private_key
    console.log(jsonString)
    const sha1 = crypto.createHash('sha1').update(jsonString).digest('bin')
    console.log(sha1)
    const signatureCreated = Buffer.from(sha1).toString('base64')
    console.log(signatureCreated)
    if(signatureCreated === signatureRecieved){
        console.log('hellooooo it is meeeeee')
        const decodedString = Buffer.from(dataRecieved, 'base64').toString('utf-8')
        console.log("decoded: " , decodedString)
        const status = JSON.parse(decodedString).status
        console.log(status)
        if(status === 'success'){
            return res.status(200)
        }
        else if(status === 'error'){
            return res.status(400)
        }
        else if(status === 'failure'){
            return res.status(420)
        }
        else if(status === 'reversed'){
            return res.status(423)
        }        
    }
    else{
        console.log('signature is not proved')
        return res.status(409)
    }
})

app.get('/', (req,res)=> {
    console.log('hello payment get')
    res.send("hi get")
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})