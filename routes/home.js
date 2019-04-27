const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')
const { authenticated } = require('../config/auth')

// main
router.get('/', authenticated, (req, res) => {
  Restaurant.find({})
    .sort({ name_en: 'asc' })
    .exec((err, restaurants) => {
      if (err) console.error(err)
      res.render('index', { restaurants })
    })
})

// sort by descending
router.get('/sort_desc', authenticated, (req, res) => {
  Restaurant.find({})
    .sort('-name_en')
    .exec((err, restaurants) => {
      if (err) console.error(err)
      res.render('index', { restaurants })
    })
})

// sort by category
router.get('/sort_category', authenticated, (req, res) => {
  Restaurant.find({})
    .sort('category')
    .exec((err, restaurants) => {
      if (err) console.error(err)
      res.render('index', { restaurants })
    })
})

// sort by location
router.get('/sort_location', authenticated, (req, res) => {
  Restaurant.find({})
    .sort('location')
    .exec((err, restaurants) => {
      if (err) console.error(err)
      res.render('index', { restaurants })
    })
})

// sort by rating
router.get('/sort_rating', authenticated, (req, res) => {
  Restaurant.find({})
    .sort('rating')
    .exec((err, restaurants) => {
      if (err) console.error(err)
      res.render('index', { restaurants })
    })
})

router.get('/sort_rating-desc', authenticated, (req, res) => {
  Restaurant.find({})
    .sort('-rating')
    .exec((err, restaurants) => {
      if (err) console.error(err)
      res.render('index', { restaurants })
    })
})

// search
router.get('/search', authenticated, (req, res) => {
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

module.exports = router