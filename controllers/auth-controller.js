const User = require("../models/user-model");

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

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
};
