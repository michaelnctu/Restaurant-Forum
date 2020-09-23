const db = require('../../models')
const Restaurant = db.Restaurant
const Category = db.Category
const categoryService = require('../../services/categoryService.js')


const categoryController = {

  postCategory: (req, res) => {

    categoryService.postCatrgory(req, res, (data) => {
      return res.json(data)
    })
  }
}



module.exports = categoryController