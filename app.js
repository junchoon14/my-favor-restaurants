const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true })

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
  Restaurant.find((err, restaurants) => {
    if (err) console.error(err)
    res.render('index', { restaurants: restaurants })
  })
})

app.get('/restaurants', (req, res) => {
  res.send('index')
})

// create
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  const restaurant = Restaurant(req.body)
  restaurant.save(err => {
    if (err) console.error(err)
    return res.redirect('/')
  })
})

//read
app.get('/restaurants/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) console.error(err)
    return res.render('detail', { restaurant })
  })

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