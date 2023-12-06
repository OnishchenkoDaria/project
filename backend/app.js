const express = require('express')
const app = express()

const postRouter = require('./posts.js')
const registerRouter = require('./register.js')
app.use('/api/posts', postRouter)
app.use('/users', registerRouter)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})