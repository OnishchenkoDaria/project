const express = require('express')
const app = express()

const testRouter = require('./posts.js')
app.use('/api/posts', testRouter)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})