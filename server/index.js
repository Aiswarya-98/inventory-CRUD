require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Router/router')
require('./DB/connection')

// create server

const app = express()
app.use(cors())
app.use(express.json())
app.use(router)

app.use('/uploads',express.static('./uploads'))

const PORT = 4000 || process.env.PORT
app.listen(PORT,()=>{
  console.log(`app listening at ${PORT}`);
})

