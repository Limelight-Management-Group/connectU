module.exports = {

  ensureAuthenticated: function(req, res, next){
    if(req.isAuthenticated()){
      return next();
    };
    // const socket = io();
    req.flash('error_msg', 'Please login to view this resource.');
    res.redirect('/');
  }

};