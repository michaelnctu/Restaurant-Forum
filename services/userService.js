const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User
const Restaurant = db.Restaurant
const Comment = db.Comment
const Favorite = db.Favorite
const Like = db.Like
const Followship = db.Followship


const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

const fs = require('fs')







const userService = {

  addFollowing: (req, res, callback) => {
    return Followship.create({
      followerId: req.user.id,
      followingId: req.params.userId
    })
      .then((followship) => {
        return callback({ status: 'success', message: '' })
      })
  },

  removeFollowing: (req, res, callback) => {
    return Followship.findOne({
      where: {
        followerId: req.user.id,
        followingId: req.params.userId
      }
    })
      .then((followship) => {
        followship.destroy()
          .then((followship) => {
            return callback({ status: 'success', message: '' })
          })
      })
  },

  addLike: (req, res, callback) => {

    return Like.findOrCreate({
      where: { RestaurantId: req.params.restaurantId, UserId: req.user.id },
      defaults: {
        UserId: req.user.id,
        RestaurantId: req.params.restaurantId
      }
    }).then((restaurant) => {
      return callback({ status: 'success', message: '' })
    })

  },

  removeLike: (req, res, callback) => {
    return Like.findOne({
      where: {
        UserId: req.user.id,
        RestaurantId: req.params.restaurantId
      }
    })
      .then((Like) => {
        Like.destroy()
          .then((restaurant) => {
            return callback({ status: 'success', message: '' })
          })
      })
  },


  getTopUser: (req, res, callback) => {
    // 撈出所有 User 與 followers 資料
    return User.findAll({
      include: [
        { model: User, as: 'Followers' }
      ]
    }).then(users => {
      // 整理 users 資料
      users = users.map(user => ({
        ...user.dataValues,
        // 計算追蹤者人數
        FollowerCount: user.Followers.length,
        // 判斷目前登入使用者是否已追蹤該 User 物件
        isFollowed: req.user.Followings.map(d => d.id).includes(user.id)
      }))
      // 依追蹤者人數排序清單
      users = users.sort((a, b) => b.FollowerCount - a.FollowerCount)
      return callback({ users: users })
    })
  },


  addFavorite: (req, res, callback) => {
    return Favorite.create({
      UserId: req.user.id,
      RestaurantId: req.params.restaurantId
    })
      .then((restaurant) => {
        return callback({ status: 'success', message: '' })
      })
  },

  removeFavorite: (req, res, callback) => {
    return Favorite.findOne({
      where: {
        UserId: req.user.id,
        RestaurantId: req.params.restaurantId
      }
    })
      .then((favorite) => {
        favorite.destroy()
          .then((restaurant) => {
            return callback({ status: 'success', message: '' })
          })
      })
  },

  //A19-Q2
  getUser: (req, res, callback) => {
    return User.findByPk(req.params.id, {
      include: [
        { model: Restaurant, as: 'FavoritedRestaurants' },
        { model: User, as: 'Followings' },
        { model: User, as: 'Followers' },
        { model: Comment, include: [Restaurant] }
      ]
    }).then(user => {
      console.log('user model', user.toJSON())
      return callback({ user: user.toJSON() })
    })
  },

  //A19-Q2
  putUser: (req, res, callback) => {
    if (!req.body.name) {
      return callback({ status: 'error', message: 'name did not exist' })
    }

    if (Number(req.params.id) !== req.user.id) {
      return callback({ status: 'error', message: 'permission denied' })
    }

    const { file } = req
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID);
      imgur.upload(file.path, (err, img) => {
        //error handling
        if (err) {
          next(err)
          return
        }

        return User.findByPk(req.params.id)
          .then((user) => {
            user.update({
              name: req.body.name,
              image: file ? img.data.link : user.image
            }).then((user) => {
              return callback({ status: 'sucess', message: 'user was successfully  updated' })
            })
          })
      })
    } else {
      console.log('目前的id是', req.params.id)
      console.log('目前的req.body', req.body.name)
      return User.findByPk(req.params.id)
        .then((user) => {
          user.update({
            name: req.body.name,
            image: user.image
          }).then((user) => {
            return callback({ status: 'sucess', message: 'user was successfully  updated' })
          })
        })
    }
  },





}


module.exports = userService
