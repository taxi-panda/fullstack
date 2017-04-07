const AuthService = {};

AuthService.restrict = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
};

module.exports = AuthService;
