const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

router.get('/', (req, res) => {
  res.send('index')
})

// create
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const restaurant = Restaurant(req.body)
  restaurant.save(err => {
    if (err) console.error(err)
    return res.redirect('/')
  })
})

//read
router.get('/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) console.error(err)
    return res.render('detail', { restaurant })
  })
})

//edit
router.get('/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) console.error(err)
    return res.render('edit', { restaurant })
  })
})

router.put('/:id', (req, res) => {
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
router.delete('/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) console.error(err)
    restaurant.remove(err => {
      if (err) console.error(err)
      return res.redirect('/')
    })
  })
})

module.exports = router