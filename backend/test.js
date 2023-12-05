const express = require('express')

const testRouter = express.Router()

testRouter.get('/', (request, response) => {
    response.send('hi')
})