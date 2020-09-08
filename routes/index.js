const restController = require('../controllers/restController.js')
const adminController = require('../controllers/restController.js')
const userController = require('../controllers/userController.js')
const passport = require('../config/passport.js')

module.exports = app => {



  app.get('/', (req, res) => res.redirect('/restaurants'))

  app.get('/restaurants', restController.getRestaurants)


  app.get('/admin', (req, res) => res.redirect('/admin/restaurants'))

  app.get('/admin/restaurants', adminController.getRestaurants)

  app.get('/signup', userController.signUpPage) //負責 render 註冊的頁面

  app.post('/signup', userController.signUp)  //signUp：負責實際處理註冊的行為

  app.get('/signin', userController.signInPage)

  app.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', faulureFlash: true }), userController.signIn)

  app.get('/logout', userController.logout)


}

