function isLoggedIn(req, res, next) {
  if (req.cookies.token === "") res.send("You must login first");
  else {
    let data = jwt.verify(req.cookies.token, "shhs"); 
    req.user = data;
  }
  next();
}