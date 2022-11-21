const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const app = express()

// Config

const port = 3000

// middlewares

app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: app.get('views') + '/layouts',
    partialsDir: app.get('views') + '/partials',
    extname: '.hbs'
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'pampel',
    resave: true,
    saveUninitialized: true
}))
app.set('view engine', '.hbs')
app.use(morgan('dev'))
app.use(flash())
// Global Variables
app.use((req, res, next) =>{
    res.locals.success_msg = req.flash('succes_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})
require('./config/passport')
app.use(passport.initialize())
app.use(passport.session())
// Routes

app.use(express.static('public'))
app.use('/', require('./Router/routes'))
app.use('/', require('./Router/lib/register'))
app.use('/', require('./Router/lib/login'))
app.use('/', require('./Router/lib/addMusic'))



app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})