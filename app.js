const express = require('express')
const app = express() //for executing express as a fn
const categoryRoutes = require('./api/controllers/category')
const authorRoutes = require('./api/controllers/author')
const postRoutes = require('./api/controllers/post')
const userRoutes = require('./api/controllers/user')
const morgan = require('morgan')
const bodyParser =  require('body-parser')
const mongoose = require('mongoose')

app.use(morgan('dev')) //format use for the output
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
//cors
app.use((req,res,next) => {
  res.header('Access-Control-Allow-Origin','*')
  res.header('Access-Control-Allow-Headers',
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET')
    return res.status(200).json({})
  }
  next()
})

//utility method
//incoming req has to go through app.use
app.use('/category',categoryRoutes)
app.use('/author',authorRoutes)
app.use('/posts',postRoutes)
app.use('/users',userRoutes)

mongoose.connect(
  'mongodb://localhost:27017/restapi',{
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
mongoose.Promise = global.Promise
//for error handling
app.use((req,res,next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

app.use((error,req,res,next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})
module.exports = app
