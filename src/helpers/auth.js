const helpers = {}

helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        req.flash('error_msg', 'Not Authorized')
        return next()
    }
    res.redirect('/login')
}

module.exports = helpers