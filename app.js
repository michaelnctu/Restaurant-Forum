const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const Handlebars = require('handlebars')

// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config()
// }


const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const methodOverride = require('method-override')

app.use(methodOverride('_method'))


app.engine('handlebars', handlebars())
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
app.use(flash())

app.use((req, res, next) => {
  res.locals.success_message = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.user = req.user
  next()
})

app.use(passport.initialize())
app.use(passport.session())

app.use('/upload', express.static(__dirname + '/upload'))

app.listen(port, () => {
  console.log(`Example all listening on port ${port}!`)
})

Handlebars.registerHelper('adminChecker', function (value) {
  if (value) { return 'admin' }
  else { return 'user' }
})

Handlebars.registerHelper('revadminChecker', function (value) {
  if (!value) { return 'admin' }
  else { return 'user' }
})

require('./routes')(app, passport) // 把 passport 傳入 routes