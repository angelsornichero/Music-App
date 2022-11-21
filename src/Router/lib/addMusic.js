const express = require('express')
const router = express.Router();
const pool = require('../../database')

router.post('/music/add', async (req, res) =>{
   const {name, artist} = req.body
   
   const username = req.user.username
   console.log(name, artist, username)
   if (name && artist && username) {
        const insertSong = pool.query(`INSERT INTO music(name, username, artist) VALUES ('${name}', '${username}', '${artist}')`, 
        (err, results) =>{
            if (err) return false;
            if (results) console.log(results); return true
        })
        if (insertSong === true) {console.log('Song Added'); req.flash('success_msg', 'Song added succesfully'); res.redirect('/home')}
        
        else {console.log('Song no Added 2'); req.flash('error_msg', 'There is one field left'); res.redirect('/home')}
   } 
   else {
    console.log('Song no Added'); req.flash('error_msg', 'There is one field left'); res.redirect('/home')
   }
})




module.exports = router;