const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.redirect("/login"); 
    }

    const decoded = jwt.verify(token, "shhhs");
    
    req.user = decoded; 
    next();
  } catch (err) {
    console.error(err);
    res.redirect("/login");
  }
};

module.exports = isLoggedIn;
