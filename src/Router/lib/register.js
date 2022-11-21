const express = require('express')
const router = express.Router();

const user = require('../../models/user')

const User = new user()

router.post('/register', async (req, res) => {
    console.log(req.body)
    const { name, username, password, repeat_password, email } = req.body
    if (name && username && password && repeat_password && email){
        
        if (await User.insertUser(username, name, password, repeat_password, email) === false) {
            console.log('false'); req.flash('error_msg', 'User alredy exists or Password an repeat password are not the same'); res.redirect('/register-error');
        }
        else {
            req.flash('succes_msg', 'User register succesful'); res.redirect('/home');
        }  

    } else {
        req.flash('error_msg', 'There are some fields left'); res.redirect('/register-error');
    }
    
})




module.exports = router;