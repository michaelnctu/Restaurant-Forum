const bcrypt = require('bcryptjs')
const db = require('../models')
const imgur = require('imgur-node-api')

const fs = require('fs')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID
//  process.env.IMGUR_CLIENT_ID 'fd721781137eed3'
const User = db.User
const Comment = db.Comment
const Restaurant = db.Restaurant
const Favorite = db.Favorite
const Followship = db.Followship
const Like = db.Like
const userService = require('../services/userService.js')


const userController = {

  addFollowing: (req, res) => {

    userService.addFollowing(req, res, (data) => {
      return res.redirect('back')
    })
  },

  removeFollowing: (req, res) => {
    userService.removeFollowing(req, res, (data) => {
      return res.redirect('back')
    })
  },

  addLike: (req, res) => {

    userService.addLike(req, res, (data) => {
      return res.redirect('back')
    })

  },

  removeLike: (req, res) => {
    userService.removeLike(req, res, (data) => {
      return res.redirect('back')
    })
  },


  getTopUser: (req, res) => {
    userService.getTopUser(req, res, (data) => {
      return res.render('topUser', data)
    })
  },


  addFavorite: (req, res) => {
    userService.addFavorite(req, res, (data) => {
      return res.redirect('back')
    })
  },

  removeFavorite: (req, res) => {
    userService.removeFavorite(req, res, (data) => {
      return res.redirect('back')
    })
  },

  //A19-Q2
  getUser: (req, res) => {

    userService.getUser(req, res, (data) => {
      return res.render('profile', data)
    })
  },

  //A19-Q2
  editUser: (req, res) => {
    return User.findByPk(req.params.id).then(user => {
      res.render('editprofile')
    })
  },

  //A19-Q2
  putUser: (req, res, next) => {
    userService.putUser(req, res, (data) => {
      if (data['status'] === 'success') {
        req.flash('success_messages', data['message'])
      }
      res.redirect(`/users/${req.params.id}`)
    })

  },

  signUpPage: (req, res) => {
    return res.render('signup')
  },

  signUp: (req, res) => {

    if (req.body.passwordCheck !== req.body.password) {
      req.flash('error_messages', "兩次密碼輸入不同!")
      return res.redirect('/signup')
    } else {
      User.findOne({ where: { email: req.body.email } }).then(user => {
        if (user) {
          req.flash('error_messages', '信箱重複!')
          return res.redirect('/signup')
        } else {
          User.create({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
          }).then(user => {
            req.flash('success_messages', '成功註冊帳號!')
            return res.redirect('/signin')
          })

        }
      })
    }

  },

  signInPage: (req, res) => {
    return res.render('signin')
  },

  signIn: (req, res) => {
    req.flash('success_messages', '成功登入!')
    res.redirect('/restaurants')
  },

  logout: (req, res) => {
    req.flash('success_messages', '登出成功!')
    req.logout()
    res.redirect('/signin')
  }
}


module.exports = userController