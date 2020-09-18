const bcrypt = require('bcryptjs')
const db = require('../models')
const imgur = require('imgur-node-api')
const fs = require('fs')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID
const User = db.User
const Comment = db.Comment
const Restaurant = db.Restaurant


const userController = {

  getUser: (req, res) => {
    return User.findByPk(req.user.id, {
      include: [
        Comment,
        {
          model: Comment, include: [Restaurant]
        }]
    }).then(user => {
      console.log('user是', user)
      return res.render('profile', {
        user: user.toJSON()
      })
    })
  },

  editUser: (req, res) => {
    return User.findByPk(req.params.id).then(user => {
      res.render('editprofile')
    })
  },

  putUser: (req, res) => {

    if (!req.body.name) {
      req.flash('error_messages', "name didn't exist")
      res.redirect('back')
    }

    const { file } = req

    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID);
      imgur.upload(file.path, (err, img) => {
        return User.findByPk(req.params.id)
          .then((user) => {
            user.update({
              name: req.body.name,
              image: file ? img.data.link : user.image
            })
              .then((user) => {
                req.flash('success_messages', 'user was successfully  updated')
                res.redirect('/users/{$user.id}')
              })
          })
      })
    } else {
      return User.findByPk(req.params.id)
        .then((user) => {
          user.update({
            name: req.body.name,
            image: user.image,
          })
            .then((restaurant) => {
              req.flash('success_messages', 'restaurant was successfully updated')
              res.redirect('/users/{$user.id}')
            })
        })
    }
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