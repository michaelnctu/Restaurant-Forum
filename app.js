const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const Handlebars = require('handlebars')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('./config/passport')
const methodOverride = require('method-override')


const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}



app.engine('handlebars', handlebars
  ({
    defaultLayout: 'main',
    // handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: require('./config/handlebars-helpers')
  }))

app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(methodOverride('_method'))


app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.user = req.user
  next()
})




app.use('/upload', express.static(__dirname + '/upload'))

app.listen(port, () => {
  console.log(`Example all listening on port ${port}!`)
})

Handlebars.registerHelper('adminChecker', function (value) {   //判斷是user或是admin 後傳到handlebars
  if (value) { return 'admin' }
  else { return 'user' }
})

Handlebars.registerHelper('revadminChecker', function (value) {     // handlebars顯示要變換的東西
  if (!value) { return 'admin' }
  else { return 'user' }
})

// Handlebars.registerHelper('selfWareness', function (v1, v2) { //提醒當下的登入情況 
//   if (v1 === v2) { return '(yourself)' }
// })

Handlebars.registerHelper('modalPop', function (admin) {
  if (admin) {
    return ` "button" class="btn btn-link" data-toggle="modal" data-target="#example{}" `

  } else { return `"sbumit" ` }


})

require('./routes')(app) // 把 passport 傳入 routes

