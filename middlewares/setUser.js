// middlewares/setUser.js
module.exports = function setUser(req, res, next) {
  if (req.session && req.session.user) {
    res.locals.user = req.session.user;   // available in all .ejs
  } else {
    res.locals.user = null;
  }
  next();
};
