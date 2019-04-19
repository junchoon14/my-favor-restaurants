const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

//main
router.get('/', (req, res) => {
  Restaurant.find({})
    .sort({ name_en: 'asc' })
    .exec((err, restaurants) => {
      if (err) console.error(err)
      res.render('index', { restaurants })
    })
})

//search
router.get('/search', (req, res) => {
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