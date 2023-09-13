function createUserSession(req, user, action) {
  req.session.uid = user._id.toString();
  req.session.isAdmin = user.isAdmin;//mostly will be undefined unless it was changed in the database.
  req.session.inventory = user.inventory;
  req.session.save(action);
}
function destroyUserAuthSession(req){
  req.session.uid = null;
}

module.exports = {
  createUserSession: createUserSession,
  destroyUserAuthSession:destroyUserAuthSession
};
