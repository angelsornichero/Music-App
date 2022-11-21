const express = require('express')
const router = express.Router();
const user = require('../../models/user')
const bcrypt = require('bcryptjs')
const User = new user()
const passport = require('passport')

router.post('/login', async (req, res) =>{
    console.log('Post login')
    passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/home',
        failureFlash: true
    })(req, res)
})


module.exports = router;