const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Restaurant = require('../restaurant')
const User = require('../user')
const restaurant = require('../../restaurant.json')

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useCreateIndex: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

db.once('open', () => {
  console.log('db connected!')

  const users = [
    {
      name: 'Alvis',
      email: 'uuu@xxx.com',
      password: '123456',
    },
    {
      name: 'Jason',
      email: 'abc@xxx.com',
      password: '567890',
    }]

  const createRestaurant = (i, user) => {
    Restaurant.create({
      name: restaurant[i].name,
      name_en: restaurant[i].name_en,
      category: restaurant[i].category,
      image: restaurant[i].image,
      location: restaurant[i].location,
      phone: restaurant[i].phone,
      google_map: restaurant[i].google_map,
      rating: restaurant[i].rating,
      description: restaurant[i].description,
      userId: user._id,
    })
  }

  users.forEach(user => {
    bcrypt.genSalt(10, (err, salt) =>
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) throw err
        user.password = hash
        User.create(user)
      })
    )
  })

  User.findOne({ name: 'Alvis' }).then(user => {
    if (user) {
      for (let i = 0; i < 3; i++) {
        createRestaurant(i, user)
      }
    }
  })

  User.findOne({ name: 'Jason' }).then(user => {
    if (user) {
      for (let i = 3; i < 6; i++) {
        createRestaurant(i, user)
      }
    }
  })
  console.log('done')
})
