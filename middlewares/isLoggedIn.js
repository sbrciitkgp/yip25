const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("Hello",token)
    if (token){
    const decoded = jwt.verify(token, "shhhs");
    req.user = decoded; 
    res.locals.user = decoded;
    }
    else{
    req.user = null; 
    res.locals.user = null;
    }
    next();
  } catch (err) {
    console.error(err);
  }
};

module.exports = isLoggedIn;
