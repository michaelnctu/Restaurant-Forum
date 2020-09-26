const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category
const User = db.User

const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

const adminService = {

  getRestaurants: (req, res, callback) => {
    return Restaurant.findAll({
      raw: true,
      nest: true,
      include: [Category]
    }).then(restaurants => {
      callback({ restaurants: restaurants })
      // return res.render('admin/restaurants', { restaurants: restaurants })
    })
  },

  getRestaurant: (req, res, callback) => {
    return Restaurant.findByPk(req.params.id, {
      raw: true,
      nest: true,
      include: [Category]
    }).then(restaurant => {
      callback({ restaurant: restaurant })
      // return res.render('admin/restaurant', {
      //   restaurant: restaurant
      // })
    })
  },

  deleteRestaurant: (req, res, callback) => {
    return Restaurant.findByPk(req.params.id)
      .then((restaurant) => {
        restaurant.destroy()
          .then((restaurant) => {
            callback({ status: 'success', message: '' })
          })
      })
  },

  postRestaurant: (req, res, callback) => {
    if (!req.body.name) {
      callback({ status: 'error', message: "name didn't exist" })
    }

    const { file } = req //const file = req.file
    if (file) {

      imgur.setClientID(IMGUR_CLIENT_ID)
      imgur.upload(file.path, (err, img) => {
        return Restaurant.create({
          name: req.body.name,
          tel: req.body.tel,
          address: req.body.address,
          opening_hours: req.body.opening_hours,
          description: req.body.description,
          image: file ? img.data.link : null,
          CategoryId: req.body.CategoryId
        }).then((restaurant) => {
          callback({ status: 'success', message: 'restaurant was successfully created' })
        })
      })
    }
    else {
      return Restaurant.create({
        name: req.body.name,
        tel: req.body.tel,
        address: req.body.address,
        opening_hours: req.body.opening_hours,
        description: req.body.description,
        image: null,
        CategoryId: req.body.CategoryId
      }).then((restaurant) => {
        callback({ status: 'success', message: 'restaurant was successfully created' })
      })
    }
  },

  putRestaurant: (req, res, callback) => {
    if (!req.body.name) {
      callback({ status: 'error', message: "name didn't exist" })
    }

    const { file } = req
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID);
      imgur.upload(file.path, (err, img) => {
        return Restaurant.findByPk(req.params.id)
          .then((restaurant) => {
            restaurant.update({
              name: req.body.name,
              tel: req.body.tel,
              address: req.body.address,
              opening_hours: req.body.opening_hours,
              description: req.body.description,
              image: file ? img.data.link : restaurant.image,
              CategoryId: req.body.CategoryId
            })
              .then((restaurant) => {

                callback({ status: 'success', message: 'restaurant was successfully updated' })

                // req.flash('success_messages', 'restaurant was successfully to update')
                // res.redirect('/admin/restaurants')
              })
          })
      })
    }
    else {
      return Restaurant.findByPk(req.params.id)
        .then((restaurant) => {
          restaurant.update({
            name: req.body.name,
            tel: req.body.tel,
            address: req.body.address,
            opening_hours: req.body.opening_hours,
            description: req.body.description,
            image: restaurant.image,
            CategoryId: req.body.CategoryId
          })
            .then((restaurant) => {
              callback({ status: 'success', message: 'restaurant was successfully updated' })
              // req.flash('success_messages', 'restaurant was successfully to update')
              // res.redirect('/admin/restaurants')
            })
        })
    }
  },

  getUsers: (req, res, callback) => {
    return User.findAll({ raw: true, nest: true }).then(users => {
      callback({ users: users })
    })
    // .catch(err => console.log(err))
  },

  putUsers: (req, res) => {
    console.log(req.user)

    return User.findByPk(req.params.id)  //找出表單送出的user
      .then(user => {
        user.update({
          isAdmin: !user.isAdmin
        })
      }).then((user) => {
        callback({ status: 'success', message: 'user was successfully updated' })
        // req.flash('success_messages', 'user was successfully updated')
        // res.redirect('/admin/users')
      })
      .catch(err => console.log(err))

  }





}

module.exports = adminService