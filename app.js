const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const mongoose = require('mongoose')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

mongoose.connect('mongodb://localhost/restauant', { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('db error!')
})

db.once('open', () => {
  console.log('db connected!')
})

const Restaurant = require('./models/restaurant')

//main
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/restaurants', (req, res) => {
  res.send('index')
})

// create
app.get('/restaurants/new', (req, res) => {
  res.send('new')
})

app.post('/restaurants', (req, res) => {
  res.send('add new')
})

//read
app.get('/restaurants/:id', (req, res) => {
  res.send('read')
})

//edit
app.get('/restaurants/:id/edit', (req, res) => {
  res.send('edit')
})
app.post('/restaurants/:id', (req, res) => {
  res.send('edit')
})

//delete
app.post('/restaurants:id/delete', (req, res) => {
  res.send('delete')
})


app.listen(3000, () => {
  console.log('App is running!')
})