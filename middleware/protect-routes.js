function protectRoutes(req, res, next) {
  if (req.path.startsWith("/admin") && !res.locals.isAdmin) {
    return res.redirect("/403");
  }
  if (!res.locals.isAuth) {
    console.log(req.path);
    return res.redirect("/401");
  }
  next();
}

module.exports = protectRoutes;
