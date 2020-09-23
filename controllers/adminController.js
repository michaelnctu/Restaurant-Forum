const db = require('../models')
const Restaurant = db.Restaurant
const User = db.User
const imgur = require('imgur-node-api')
const Category = db.Category
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID
const fs = require('fs')
const adminService = require('../services/adminService.js')



const adminController = {
  getRestaurants: (req, res) => {
    adminService.getRestaurants(req, res, (data) => {
      return res.render('admin/restaurants', data)
    })
  },

  getRestaurant: (req, res) => {

    adminService.getRestaurant(req, res, (data) => {
      return res.render('admin/restaurant', data)
    })



    // return Restaurant.findByPk(req.params.id, {
    //   raw: true,
    //   nest: true,
    //   include: [Category]
    // }).then(restaurant => {  //{raw: true} 轉換成 JS 原生物件
    //   return res.render('admin/restaurant', {
    //     restaurant: restaurant
    //   })
    // })
  },

  createRestaurant: (req, res) => {
    Category.findAll({
      raw: true,
      nest: true
    }).then(categories => {
      return res.render('admin/create', { categories: categories })
    })
  },

  postRestaurant: (req, res) => {
    adminService.postRestaurant(req, res, (data) => {
      if (data['status'] === 'error') {
        req.flash('error_messages', data['message'])
        return res.redirect('back')
      }
      req.flash('success_messages', data['message'])
      res.redirect('/admin/restaurants')
    })

  },

  editRestaurant: (req, res) => {
    Category.findAll({
      raw: true,
      nest: true
    }).then(categories => {
      return Restaurant.findByPk(req.params.id).then(restaurant => {
        return res.render('admin/create', {
          categories: categories,
          restaurant: restaurant.toJSON()
        })
      })
    })
  },

  putRestaurant: (req, res) => {

    adminService.putRestaurant(req, res, (data) => {
      if (data['status'] === 'error') {
        req.flash('error_messages', data['message'])
        return res.redirect('back')
      }
      req.flash('success_messages', data['message'])
      res.redirect('/admin/restaurants')
    })

  },

  deleteRestaurant: (req, res) => {
    adminService.deleteRestaurant(req, res, (data) => {
      if (data['status'] === 'success') {
        return res.redirect('/admin/restaurants')
      }
    })
  },



  //A17作業

  getUsers: (req, res) => {
    return User.findAll({ raw: true, nest: true }).then(users => {
      return res.render('admin/users', { users })
    })
      .catch(err => console.log(err))
  },

  putUsers: (req, res) => {
    console.log(req.user)

    return User.findByPk(req.params.id)  //找出表單送出的user
      .then(user => {
        user.update({
          isAdmin: !user.isAdmin
        })
      }).then((user) => {
        req.flash('success_messages', 'user was successfully updated')
        res.redirect('/admin/users')
      })
      .catch(err => console.log(err))

  }

}



module.exports = adminController

