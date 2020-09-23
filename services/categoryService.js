const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category
const User = db.User

const categoryService = {

  getCategories: (req, res, callback) => {
    return Category.findAll({
      raw: true,
      nest: true
    }).then(categories => {
      callback({ categories: categories })
    })
  },

  postCategory: (req, res, callback) => {
    if (!req.body.name) {
      callback({ status: error, message: 'name didn\'t exist ' })
      req.flash('error_messages', 'name didn\'t exist ')
    } else {
      return Category.create({
        name: req.body.name
      })
        .then((category) => {
          callback({ status: 'success', message: 'category was successfully created' })
        })
    }
  },


}

module.exports = categoryService