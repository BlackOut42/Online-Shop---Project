const bcrypt = require("bcryptjs");

const db = require("../data/database");

class User {
  constructor(email, password, fullname, city, street, postal) {
    this.email = email;
    this.password = password;
    this.fullname = fullname;
    this.address = {
      city: city,
      street: street,
      postal: postal,
    };
  }
  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 12); // hashing the password
    await db.getDb().collection("users").insertOne({
      email: this.email,
      password: hashedPassword,
      address: this.address,
    });
  }
  getUserWithEmail() {
    return db.getDb().collection("users").findOne({ email: this.email }); //async operation await is needed when called.
  }
  passwordIsMatching(hashedPassword) {
    return bcrypt.compare(this.password, hashedPassword); //bcrypt.compare is an async operation, await is needed when using this function.
  }
}
module.exports = User;
