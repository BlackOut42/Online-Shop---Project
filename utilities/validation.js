function isEmpty(value) {
  return !value || value.trim(" ") === "";
}
function userCredentialsAreValid(email, password) {
  return email && email.includes("@") && password && password.length >= 6;
}
function userDetailsAreValid(email, password, fullname, city, street, postal) {
  return (
    userCredentialsAreValid(email, password) &&
    !isEmpty(fullname) &&
    !isEmpty(city) &&
    !isEmpty(street) &&
    !isEmpty(postal)
  );
}
function emailIsConfirmed(email, confirmEmail) {
  return email === confirmEmail;
}
module.exports = {
  userDetailsAreValid: userDetailsAreValid,
  emailIsConfirmed: emailIsConfirmed,
};
