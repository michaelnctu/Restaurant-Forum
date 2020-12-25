const db = require('../models')
const userController = require('./userController')
const Restaurant = db.Restaurant
const Category = db.Category
const Comment = db.Comment
const User = db.User
const pageLimit = 10
const restService = require('../services/restService')


let restController = {

  getRestaurants: (req, res) => {
    restService.getRestaurants(req, res, (data => {
      return res.render('restaurants', data)
    }))
  },

  getTopRest: (req, res) => {

    restService.getRestaurants(req, res, (data => {
      return res.render('topRest', data)
    }))
  },

  // A20-Q2
  getRestaurant: (req, res) => {
    restService.getRestaurant(req, res, (data) => {
      return res.render('restaurant', data)
    })




    // return Restaurant.findByPk(req.params.id, {
    //   include: [
    //     Category,
    //     { model: User, as: 'FavoritedUsers' },
    //     { model: User, as: 'LikedUsers' },
    //     { model: Comment, include: [User] }
    //   ]
    // })
    //   .then(restaurant => {


    //     // let viewCounts = restaurant.viewCounts ? restaurant.viewCounts : 0 //A20
    //     // console.log('評論數', viewCounts)

    //     // viewCounts = restaurant.increment('viewCounts')


    //     restaurant.increment('viewCounts').then(restaurant => {
    //       const isFavorited = restaurant.FavoritedUsers.map(d => d.id).includes(req.user.id)  //restaurant.FavoritedUsers.map(d => d.id)輸出一個 id的array 
    //       const isLiked = restaurant.LikedUsers.map(d => d.id).includes(req.user.id)
    //       return res.render('restaurant', {
    //         restaurant: restaurant.toJSON(),
    //         isFavorited: isFavorited,
    //         isLiked: isLiked

    //       })
    //     })
    //   })
  },

  getFeeds: (req, res) => {

    restService.getFeeds(req, res, (data) => {
      return res.render('feeds', data)
    })
  },


  getDashboard: (req, res) => {

    restService.getDashboard(req, res, (data) => {
      return res.render('dashboard', data)
    })
  }
}

module.exports = restController