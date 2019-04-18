const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/restauant', { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('db error!')
})

db.once('open', () => {
  console.log('db connected!')
})

app.get('/', (req, res) => {
  res.send('index')
})

app.listen(3000, () => {
  console.log('App is running!')
})