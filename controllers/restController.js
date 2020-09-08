//負責處理瀏覽餐廳頁面的 function

const restController = {
  getRestaurants: (req, res) => {
    return res.render('restaurants')
  }
}

module.exports = restController