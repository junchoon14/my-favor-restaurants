const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')
const { authenticated } = require('../config/auth')

router.get('/', (req, res) => {
  res.send('index')
})

// create
router.get('/new', authenticated, (req, res) => {
  return res.render('new')
})

router.post('/', authenticated, (req, res) => {
  const restaurant = Restaurant({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description,
    userId: req.user._id,
  })
  restaurant.save(err => {
    if (err) console.error(err)
    return res.redirect('/')
  })
})

//read
router.get('/:id', authenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) console.error(err)
    return res.render('detail', { restaurant })
  })
})

//edit
router.get('/:id/edit', authenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) console.error(err)
    return res.render('edit', { restaurant })
  })
})

router.put('/:id', authenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) console.error(err)
    restaurant = Restaurant(req.body)
    restaurant.save(err => {
      if (err) console.error(err)
      return res.redirect(`/restaurants/${req.params.id}`)
    })
  })
})

//delete
router.delete('/:id/delete', authenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) console.error(err)
    restaurant.remove(err => {
      if (err) console.error(err)
      return res.redirect('/')
    })
  })
})

module.exports = router