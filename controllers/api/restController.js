const commentService = require('../../services/restService.js')


let restController = {

  getRestaurants: (req, res) => {
    restService.getRestaurants(req, res, (data => {
      return res.json(data)
    }))
  },

  getTopRest: (req, res) => {

    restService.getRestaurants(req, res, (data => {
      return res.json(data)
    }))
  },

  // A20-Q2
  getRestaurant: (req, res) => {
    restService.getRestaurant(req, res, (data) => {
      return res.json(data)
    })
  },

  getFeeds: (req, res) => {

    restService.getFeeds(req, res, (data) => {
      return res.json(data)
    })
  },


  getDashboard: (req, res) => {

    restService.getDashboard(req, res, (data) => {
      return res.json(data)
    })
  }
}

module.exports = restController