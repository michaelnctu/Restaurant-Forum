const db = require('../models')
const userController = require('./userController')
const Restaurant = db.Restaurant
const Category = db.Category
const Comment = db.Comment
const User = db.User
const pageLimit = 10


let restController = {

  getRestaurants: (req, res) => {
    let offset = 0
    let whereQuery = {}
    let categoryId = ''
    if (req.query.page) {
      offset = (req.query.page - 1) * pageLimit
    }
    if (req.query.categoryId) {
      categoryId = Number(req.query.categoryId)
      whereQuery['categoryId'] = categoryId
    }
    Restaurant.findAndCountAll({ include: Category, where: whereQuery, offset: offset, limit: pageLimit })
      .then(result => {
        // data for pagination
        let page = Number(req.query.page) || 1
        let pages = Math.ceil(result.count / pageLimit)
        let totalPage = Array.from({ length: pages }).map((item, index) => index + 1)
        let prev = page - 1 < 1 ? 1 : page - 1
        let next = page + 1 > pages ? pages : page + 1
        // clean up restaurant data
        const data = result.rows.map(r => ({
          ...r.dataValues,
          description: r.dataValues.description.substring(0, 50),
          isFavorited: req.user.FavoritedRestaurants.map(d => d.id).includes(r.id), //true 或是false
          isLiked: req.user.LikedRestaurants.map(d => d.id).includes(r.id)
        }))

        Category.findAll({
          raw: true,
          nest: true
        }).then(categories => {
          return res.render('restaurants', {
            restaurants: data,
            categories: categories,
            categoryId: categoryId,
            page: page,
            totalPage: totalPage,
            prev: prev,
            next: next
          })
        })
      })
  },

  getTopRest: (req, res) => {
    // 撈出所有 User 與 followers 資料
    return Restaurant.findAll({

      include: [
        Category,
        { model: User, as: 'FavoritedUsers' },
        { model: Comment, include: [User] }
      ]
    }).then(restaurants => {

      // 整理 users 資料
      restaurants = restaurants.map(restaurant => ({
        ...restaurant.dataValues,

        description: restaurant.description.substring(0, 50),

        // 計算FAVORITE過幾次
        favCount: restaurant.FavoritedUsers.length,

        isfaved: restaurant.FavoritedUsers.map(r => r.id).includes(req.user.id)
      }))
      // 依追蹤者人數排序清單
      // restaurants = restaurants.sort((a, b) => b.favCount - a.favCount).filter((_, index) => index < 10) 舊寫法
      restaurants = restaurants.sort((a, b) => b.favCount - a.favCount).slice(0, 10)
      return res.render('topRest', { restaurants: restaurants })
    })
  },


  // A20-Q2
  getRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id, {
      include: [
        Category,
        { model: User, as: 'FavoritedUsers' },
        { model: Comment, include: [User] }
      ]
    })
      .then(restaurant => {


        // let viewCounts = restaurant.viewCounts ? restaurant.viewCounts : 0 //A20
        // console.log('評論數', viewCounts)

        // viewCounts = restaurant.increment('viewCounts')

        console.log('increment前', restaurant.viewCounts)

        restaurant.increment('viewCounts').then(restaurant => {
          console.log('increment後', restaurant.viewCounts)
          const isFavorited = restaurant.FavoritedUsers.map(d => d.id).includes(req.user.id)  //restaurant.FavoritedUsers.map(d => d.id)輸出一個 id的array 
          return res.render('restaurant', {
            restaurant: restaurant.toJSON(),
            isFavorited: isFavorited
          })
        })
      })
  },

  getFeeds: (req, res) => {
    return Restaurant.findAll({
      limit: 10,
      raw: true,
      nest: true,
      order: [['createdAt', 'DESC']],
      include: [Category]
    }).then(restaurants => {
      Comment.findAll({
        limit: 10,
        raw: true,
        nest: true,
        order: [['createdAt', 'DESC']],
        include: [User, Restaurant]
      }).then(comments => {
        return res.render('feeds', {
          restaurants: restaurants,
          comments: comments
        })
      })
    })
  },


  getDashboard: (req, res) => {
    console.log('hey', req.params.id)
    return Restaurant.findByPk(req.params.id, {

      include: [
        Category,
        { model: Comment, include: [User] }
      ]
    }).then(restaurant => {
      console.log('restaurant資料', restaurant)
      return res.render('dashboard', {

        restaurant: restaurant.toJSON()
      })
    })
  }
}

module.exports = restController