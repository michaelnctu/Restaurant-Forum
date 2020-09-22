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
  }
}

module.exports = categoryService