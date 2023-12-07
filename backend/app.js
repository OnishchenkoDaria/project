const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));

const postRouter = require('./posts.js')
const registerRouter = require('./register.js')
app.use('/api/posts', postRouter)
app.use('/users', registerRouter)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})