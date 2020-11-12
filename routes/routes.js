const express = require('express')
const router = express.Router()

const restController = require('../controllers/restController.js')
const adminController = require('../controllers/adminController.js')
const userController = require('../controllers/userController.js')
const categoryController = require('../controllers/categoryController.js')
const commentCategory = require('../controllers/commentController.js')
const passport = require('../config/passport.js')
const multer = require('multer')
const upload = multer({ dest: 'temp/' })


const authenticated = (req, res, next) => {
  console.log(req.user)
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/signin')
}
const authenticatedAdmin = (req, res, next) => {
  if (req.isAuthenticated()) {

    if (req.user.isAdmin) {
      console.log("執行admin")
      return next()
    }

    return res.redirect('/')
  }
  res.redirect('/signin')
}

//facebook auth
const auth = require('./auth')

router.use('/auth', auth)


router.get('/', authenticated, (req, res) => res.redirect('/restaurants'))

router.get('/restaurants', authenticated, restController.getRestaurants)

router.get('/restaurants/top', authenticated, restController.getTopRest)

router.get('/restaurants/feeds', authenticated, restController.getFeeds)

router.get('/restaurants/:id', authenticated, restController.getRestaurant)






router.get('/restaurants/:id/dashboard', authenticated, restController.getDashboard)

router.post('/comments', authenticated, commentCategory.postComment)

router.delete('/comments/:id', authenticatedAdmin, commentCategory.deleteComment)

router.get('/admin', authenticatedAdmin, (req, res) => res.redirect('/admin/restaurants'))

router.get('/admin/users', authenticatedAdmin, adminController.getUsers)

router.get('/users/top', authenticated, userController.getTopUser)

router.get('/users/:id', authenticated, userController.getUser)

router.get('/users/:id/edit', authenticated, userController.editUser)

//A19-Q2
router.put('/users/:id', authenticated, upload.single('image'), userController.putUser)
router.put('/admin/users/:id', authenticatedAdmin, adminController.putUsers)
router.get('/admin/restaurants', authenticatedAdmin, adminController.getRestaurants)

//favorite list
router.post('/favorite/:restaurantId', authenticated, userController.addFavorite)
router.delete('/favorite/:restaurantId', authenticated, userController.removeFavorite)

//like
router.post('/like/:restaurantId', authenticated, userController.addLike)
router.delete('/like/:restaurantId', authenticated, userController.removeLike)

//followship 
router.post('/following/:userId', authenticated, userController.addFollowing)
router.delete('/following/:userId', authenticated, userController.removeFollowing)


router.get('/admin/restaurants/create', authenticatedAdmin, adminController.createRestaurant)

router.get('/admin/restaurants/:id', authenticatedAdmin, adminController.getRestaurant)



router.get('/admin/restaurants/:id/edit', authenticatedAdmin, adminController.editRestaurant)

router.put('/admin/restaurants/:id', authenticatedAdmin, upload.single('image'), adminController.putRestaurant)

router.get('/admin/categories', authenticatedAdmin, categoryController.getCategories)

router.get('/admin/categories/:id', authenticatedAdmin, categoryController.getCategories)

router.put('/admin/categories/:id', authenticatedAdmin, categoryController.putCategory)

router.delete('/admin/categories/:id', authenticatedAdmin, categoryController.deleteCategory)

router.post('/admin/categories', authenticatedAdmin, categoryController.postCategory)




// 修改後台新增餐廳的路由
router.post('/admin/restaurants', authenticatedAdmin, upload.single('image'), adminController.postRestaurant)

router.delete('/admin/restaurants/:id', authenticatedAdmin, adminController.deleteRestaurant)




router.get('/signup', userController.signUpPage) //負責 render 註冊的頁面

router.post('/signup', userController.signUp)  //signUp：負責實際處理註冊的行為

router.get('/signin', userController.signInPage)

router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', faulureFlash: true }), userController.signIn)

router.get('/logout', userController.logout)



module.exports = router