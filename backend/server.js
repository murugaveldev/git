const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')

const TodoRoutes = require('./routes/TodoRoutes')

const app = express()

//middleware
app.use(express.json())
app.use(cors());


//routes
app.use('/api/v1' , TodoRoutes )



//mongodb 
mongoose.connect(process.env.MONGODB)

const dbconfig = mongoose.connection;


dbconfig.on('connected', () => {
    console.log("mognodb conntected successfully")
})

dbconfig.on('error', () => {
    console.log("monodb not conncted")
})



//server
const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`server start on the port ${port}`)
})


