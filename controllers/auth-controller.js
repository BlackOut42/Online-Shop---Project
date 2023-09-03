const User = require("../models/user-model");
const authUtil = require("../utilities/authentication-util");
const userValidation = require("../utilities/validation");
const flashToSession = require("../utilities/session-flash");

function getSignup(req, res) {
  let sessionData = flashToSession.getSessionData(req);
  if (!sessionData) {
    sessionData = {
      email: "",
      emailConfirm: "",
      password: "",
      fullname: "",
      city: "",
      street: "",
      postal: "",
    };
  }
  res.render("customer/auth/signup", { inputData: sessionData });
}

async function signup(req, res, next) {
  const userData = req.body;
  const userInput = {
    email: userData.email,
    emailConfirm: userData["email-confirm"],
    password: userData.password,
    fullname: userData.fullname,
    city: userData.city,
    street: userData.street,
    postal: userData.postal,
  };
  if (
    !userValidation.userDetailsAreValid(
      userData.email,
      userData.password,
      userData.fullname,
      userData.city,
      userData.street,
      userData.postal
    ) ||
    !userValidation.emailIsConfirmed(userData.email, userData["email-confirm"])
  ) {
    flashToSession.flashDataToSession(
      req,
      {
        errorMessage: "Check your input - Some of the credentials are invalid!",
        ...userInput,
      },
      function () {
        res.redirect("/signup");
      }
    );
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
      flashToSession.flashDataToSession(
        req,
        {
          errorMessage: "User exists already!try logging in instead!",
          ...userInput,
        },
        function () {
          res.redirect("/signup");
        }
      );
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
  let sessionData = flashToSession.getSessionData(req);

  if (!sessionData) {
    sessionData = {
      email: "",
      password: "",
    };
  }
  res.render("customer/auth/login", { inputData: sessionData });
}

async function login(req, res, next) {
  const user = new User(req.body.email, req.body.password);
  let hasError = false;
  let existingUser;
  try {
    existingUser = await user.getUserWithEmail(); //await is needed due to async operation.
  } catch (error) {
    next(error);
    return;
  }
  if (!existingUser) {
    hasError = true;
  }
  if (!hasError) {
    const passwordIsMatching = await user.passwordIsMatching(
      existingUser.password
    );
    if (!passwordIsMatching) {
      hasError = true;
    }
  }
  if (hasError) {
    flashToSession.flashDataToSession(
      req,
      {
        errorMessage:
          "Invalid credentials! - Please check the email & password you have provided.",
        email: user.email,
        password: user.password,
      },
      function () {
        res.redirect("/login");
      }
    );
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
