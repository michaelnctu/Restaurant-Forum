const db = require('../../models')
const Restaurant = db.Restaurant
const Category = db.Category
const adminService = require('../../services/adminService.js')


const adminController = {
  getRestaurants: (req, res) => {

    adminService.getRestaurants(req, res, (data) => {
      return res.json(data)
    })

    // return Restaurant.findAll({ include: [Category] }).then(restaurants => {
    //   return res.json({ restaurants: restaurants })
    // })
  },

  getRestaurant: (req, res) => {
    adminService.getRestaurant(req, res, (data) => {
      return res.json(data)
    })
  }


}
module.exports = adminController