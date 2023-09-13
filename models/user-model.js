const bcrypt = require("bcryptjs");

const db = require("../data/database");
const Inventory = require("./Inventory-model");

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
    const response = await db.getDb().collection("users").insertOne({
      email: this.email,
      password: hashedPassword,
      address: this.address,
    });
    await db
      .getDb()
      .collection("users")
      .updateOne(
        { _id: response.insertedId },
        { $set: { inventory: new Inventory(response.insertedId) } }
      );
  }
  getUserWithEmail() {
    return db.getDb().collection("users").findOne({ email: this.email }); //async operation await is needed when called.
  }
  async existsAlready() {
    const existingUser = await this.getUserWithEmail();
    if (existingUser) {
      return true;
    }
    return false;
  }
  passwordIsMatching(hashedPassword) {
    return bcrypt.compare(this.password, hashedPassword); //bcrypt.compare is an async operation, await is needed when using this function.
  }
}
module.exports = User;
