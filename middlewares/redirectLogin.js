
const redirectLogin = (req, res, next) => {
  try {
   if(res.locals.user){
    console.log("I am in if")
    next();
   }
    else {
      
    console.log("I am in else")
        res.redirect('/login')
    }
  } catch (err) {
    console.error(err);
    res.redirect("/login");
  }
};

module.exports = redirectLogin;
