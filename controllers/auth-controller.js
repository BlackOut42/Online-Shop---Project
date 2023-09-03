const User = require("../models/user-model");
const authUtil = require("../utilities/authentication-util");
const userValidation = require("../utilities/validation");

function getSignup(req, res) {
  res.render("customer/auth/signup");
}

async function signup(req, res, next) {
  const userData = req.body;
  if (
    !userValidation.userDetailsAreValid ||
    !userValidation.emailIsConfirmed(userData.email, userData["email-confirm"])(
      userData.email,
      userData.password,
      userData.fullname,
      userData.city,
      userData.street,
      userData.postal
    )
  ) {
    res.redirect("/signup");
    return;
  }
  const user = new User(
    userData.email,
    userData.password,
    userData.fullname,
    userData.city,
    userData.street,
    userData.postal
  );
  try {
    const existsAlready = user.existsAlready();
    if (existsAlready) {
      res.redirect("/signup");
      return;
    }
    await user.signup();
  } catch (error) {
    next(error);
    return;
  }
  res.redirect("/login");
}
function getLogin(req, res) {
  res.render("customer/auth/login");
}

async function login(req, res, next) {
  const user = new User(req.body.email, req.body.password);
  let existingUser;
  try {
    existingUser = await user.getUserWithEmail(); //await is needed due to async operation.
  } catch (error) {
    next(error);
    return;
  }
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
