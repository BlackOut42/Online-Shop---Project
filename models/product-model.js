const mongodb = require("mongodb");
const db = require("../data/database");
class Product {
  constructor(productData) {
    this.title = productData.title;
    this.summary = productData.summary;
    this.price = +productData.price; //+ added to convert string to a number.
    this.description = productData.description;
    this.image = productData.image; //this is just the name of the file not the file itself.
    this.updateImage();
    if (productData._id) {
      this.id = productData._id.toString();
    }
  }
  async saveProduct() {
    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
    };
    if (this.id) {
      const productIdObject = await new mongodb.ObjectId(this.id);
      if (!this.image) {
        //So I won't overwrite the existing image in case I don't want a new image to be set.
        delete productData.image;
      }
      await db
        .getDb()
        .collection("products")
        .updateOne(
          { _id: productIdObject },
          {
            $set: {
              ...productData,
            },
          }
        );
    } else {
      await db.getDb().collection("products").insertOne(productData);
    }
  }
  updateImage() {
    this.imagePath = `product-data/images/${this.image}`;
    this.imageURL = `/products/assets/images/${this.image}`;
  }
  async replaceImage(newImage) {
    this.image = newImage;
    this.updateImage();
  }
  static async findAll() {
    const productArr = await db.getDb().collection("products").find().toArray();
    const mappedProductArr = productArr.map(function (productDoc) {
      return (productDoc = new Product(productDoc)); // replacing each document I got from the database
    }); // with a Product object I can use.
    return mappedProductArr;
  }
  static async findById(productId) {
    let prodIdObject;
    try {
      prodIdObject = new mongodb.ObjectId(productId);
    } catch (error) {
      error.msg = "Failed to create an ObjectId.";
      throw error;
    }
    const product = await db
      .getDb()
      .collection("products")
      .findOne({ _id: prodIdObject });

    if (!product) {
      const error = new Error("Could not find a product with provided id");
      error.code = 404;
      throw error;
    }
    return new Product(product);
  }
  delete() {
    const productIdObject = new mongodb.ObjectId(this.id);
    return db
      .getDb()
      .collection("products")
      .deleteOne({ _id: productIdObject });//returns a promise and can fail error handling needed + await.
  }
}
module.exports = Product;
