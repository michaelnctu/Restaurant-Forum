const db = require('../../models')
const Restaurant = db.Restaurant
const Category = db.Category
const adminService = require('../../services/adminService.js')


const adminController = {
  getRestaurants: (req, res) => {
    adminService.getRestaurants(req, res, (data) => {
      return res.json(data)
    })
  },

  getRestaurant: (req, res) => {
    adminService.getRestaurant(req, res, (data) => {
      return res.json(data)
    })
  },

  deleteRestaurant: (req, res) => {
    adminService.deleteRestaurant(req, res, (data) => {
      return res.json(data)
    })
  },

  postRestaurant: (req, res) => {
    adminService.postRestaurant(req, res, (data) => {
      return res.json(data)
    })
  },

  putRestaurant: (req, res) => {
    adminService.putRestaurant(req, res, (data) => {
      return res.json(data)
    })
  },

  getUsers: (req, res) => {
    adminService.getUsers(req, res, (data) => {
      return res.json(data)
    }).catch(err => console.log(err))
  },
  // return User.findAll({ raw: true, nest: true }).then(users => {
  //   return res.render('admin/users', { users })
  // })
  //   .catch(err => console.log(err))

  putUsers: (req, res) => {

    adminService.putUsers(req, res, (data) => {
      return res.json(data)
    })

    // return User.findByPk(req.params.id)  //找出表單送出的user
    //   .then(user => {
    //     user.update({
    //       isAdmin: !user.isAdmin
    //     })
    //   }).then((user) => {
    //     req.flash('success_messages', 'user was successfully updated')
    //     res.redirect('/admin/users')
    //   })
    //   .catch(err => console.log(err))

  }


}
module.exports = adminController