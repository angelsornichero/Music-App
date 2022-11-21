const express = require('express');
const router = express.Router();
const pool = require('../database')
const {isAuthenticated} = require('../helpers/auth')

router.get('/', (req, res) => {
    res.render('index')
    
})

router.get('/register', (req, res) => {
    
    res.render('register')
    
})

router.get('/login', (req, res) => {
    
    res.render('login')
    
})

router.get('/register-error', (req, res) => {
    res.render('register')
})

router.get('/home', isAuthenticated, async (req, res) => {
    const songs = await pool.query('SELECT * FROM music WHERE username = ?', [req.user.username]);
    
    res.render('home', {songs})
})

module.exports = router;