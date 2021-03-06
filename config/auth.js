module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if(req.isAuthenticated()) {
            return next()
        }

        req.flash('error_msg', 'Please log in to view that resource');
        res.redirect('/users/login');
    },

    forwardAuthenticated: (req, res, next) => {
        if(!req.isAuthenticated()) {
            return next();
        } 
        res.redirect('/');
    },

    isAdmin: (req, res, next) => {
        if(req.isAuthenticated() && (req.user.isAdmin || req.user.isSuperAdmin) ) {
            return next();
        }

        req.flash('error_msg', 'No permission to view that resource');
        res.redirect('/')
    },

    isSuperAdmin: (req, res, next) => {
        if(req.isAuthenticated() && req.user.isSuperAdmin) {
            return next();
        }
        req.flash('error_msg', 'No permission to view that resource');
        res.redirect('/')
    }
}