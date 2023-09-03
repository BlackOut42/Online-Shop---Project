function checkAuthStatus(req, res, next) {
  const userId = req.session.uid;
  if (!userId) {
    return next();
  }
  res.locals.uid = userId;
  res.locals.isAuth = true;
  next();
}
module.exports = checkAuthStatus;
