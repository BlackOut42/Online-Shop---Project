const User = require("../models/user-model");
const authUtil = require("../utilities/authentication-util");

function getSignup(req, res) {
  res.render("customer/auth/signup");
}

async function signup(req, res) {
  const userData = req.body;
  const user = new User(
    userData.email,
    userData.password,
    userData.fullname,
    userData.city,
    userData.street,
    userData.postal
  );
  await user.signup();
  res.redirect("/login");
}
function getLogin(req, res) {
  res.render("customer/auth/login");
}

async function login(req, res) {
  const user = new User(req.body.email, req.body.password);
  existingUser = await user.getUserWithEmail(); //await is needed due to async operation.

  if (!existingUser) {
    return res.redirect("/login");
  }
  const passwordIsMatching = await user.passwordIsMatching(
    existingUser.password
  );
  if (!passwordIsMatching) {
    res.redirect("/login");
    return;
  }
  authUtil.createUserSession(req, existingUser, function () {
    res.redirect("/");
  });
}
function logout(req, res) {
  authUtil.destroyUserAuthSession(req);
  res.redirect("/login");
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  login: login,
  logout: logout,
};
