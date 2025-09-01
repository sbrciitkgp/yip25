const jwt = require("jsonwebtoken");

const AdminLoggedIn = (req, res, next) => {
  try {
    const admintoken = req.cookies.admintoken;
    if (!admintoken) {
      return res.redirect("/admin/login"); 
    }
    const decoded = jwt.verify(admintoken, "shhhs");
    
    req.user = decoded; 
    next();
  } catch (err) {
    console.error(err);
    res.redirect("/login");
  }
};

module.exports = AdminLoggedIn;
