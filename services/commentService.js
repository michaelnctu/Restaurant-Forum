const db = require('../models')
const Comment = db.Comment

let commentService = {

  postComment: (req, res, callback) => {
    return Comment.create({
      text: req.body.text,
      RestaurantId: req.body.restaurantId,
      UserId: req.user.id
    })
      .then((comment) => {

        return callback({
          status: 'success',
          message: 'created new comment successfully',
          RestaurantId: comment.RestaurantId,
          commentId: comment.id
        })
      })
  },

  deleteComment: (req, res) => {
    return Comment.findByPk(req.params.id)
      .then((comment) => comment.destroy()
        .then((comment) => {
          return callback({ status: 'success', message: 'comment was succesfully deleted', RestaurantId: restaurantId })
        }))
  }



}

module.exports = commentService