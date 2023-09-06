const db = require("../data/database");
class Product{
    constructor(ProductData){
        this.title = ProductData.title;
        this.summary = ProductData.summary;
        this.price = +ProductData.price;//+ added to convert string to a number.
        this.description = ProductData.description;
        this.image = ProductData.image;
        this.imagePath = `product-data/images/${ProductData.image}`;
        this.imageURL = `/products/assets/images/${ProductData.image}`;
    }
    async saveProduct(){
        const productData = {
            title:this.title,
            summary:this.summary,
            price:this.price,
            description:this.description, 
            image:this.image
        }
        await db.getDb().collection("products").insertOne(productData);
    }
}
module.exports = Product;