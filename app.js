const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

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
  Restaurant.find({})
    .sort({ name_en: 'asc' })
    .exec((err, restaurants) => {
      if (err) console.error(err)
      res.render('index', { restaurants })
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
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) console.error(err)
    return res.render('edit', { restaurant })
  })
})

app.put('/restaurants/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) console.error(err)
    restaurant = Restaurant(req.body)
    restaurant.save(err => {
      if (err) console.error(err)
      return res.redirect(`/restaurants/${req.params.id}`)
    })
  })
})

//delete
app.delete('/restaurants/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) console.error(err)
    restaurant.remove(err => {
      if (err) console.error(err)
      return res.redirect('/')
    })
  })
})

//search
app.get('/search', (req, res) => {
  Restaurant.find((err, restaurants) => {
    const restaurant = restaurants.filter(restaurant => {
      const keyword = req.query.keyword.toLowerCase()
      const name = restaurant.name.toLowerCase()
      const category = restaurant.category.toLowerCase()
      return name.includes(keyword) || category.includes(keyword)
    })
    return res.render('index', { restaurants: restaurant, keyword: req.query.keyword })
  })
})

app.listen(3000, () => {
  console.log('App is running!')
})