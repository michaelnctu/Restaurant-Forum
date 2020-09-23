const express = require('express')
const router = express.Router()

// 引入 multer 並設定上傳資料夾 
const multer = require('multer')
const upload = multer({ dest: 'temp/' })
const adminController = require('../controllers/api/adminController.js')

router.get('/admin/restaurants', adminController.getRestaurants)

router.post('/admin/restaurants', upload.single('image'), adminController.postRestaurant)

router.delete('/admin/restaurants/:id', adminController.deleteRestaurant)



module.exports = router