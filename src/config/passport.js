
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const pool = require('../database');
const bcrypt = require('bcryptjs') ;

passport.use('local', new Strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length > 0) {
        const user = rows[0];  
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) 
            done(null, user); 
        else 
            done(null, false, req.flash('error_msg', 'Incorrect Password'));
    }
    else
        done(null, false, req.flash('error_msg', 'Incorrect Username'));
}));
passport.serializeUser((user, done) => {
    console.log("Serialize: ");
    console.log(user);
    done(null, user.username);
});

passport.deserializeUser(async (id, done) => {
    const user = await pool.query('SELECT * FROM users WHERE username = ?', [id]);
    done(null, user[0]);
});