const Sequelize = require("sequelize");
const sequelize = require("../utilities/database");

const ProductModel = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DOUBLE.UNSIGNED,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = ProductModel;

// // const fs = require("fs");
// // const path = require("path");
// const Cart = require("./cartModel");
// const db = require("../utilities/database");
// // const p = path.join(
// //   path.dirname(require.main.filename),
// //   "data",
// //   "products.json"
// // );
// // getProductsFromFile = (callbackFunc) => {
// //   fs.readFile(p, (err, fileContent) => {
// //     if (err) {
// //       callbackFunc([]);
// //     } else {
// //       callbackFunc(JSON.parse(fileContent));
// //     }
// //   });
// // };
// module.exports = class ProductModel {
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }
//   save() {
//     return db.execute(
//       "insert into products(title,imageUrl,description,price) values(?,?,?,?)",
//       [this.title, this.imageUrl, this.description, this.price]
//     );
//   }
//   // save() {
//   //   getProductsFromFile((products) => {
//   //     if (this.id) {
//   //       const existingProductIndex = products.findIndex(
//   //         (prod) => prod.id === this.id
//   //       );
//   //       const updatedProducts = [...products];
//   //       updatedProducts[existingProductIndex] = this;
//   //       fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
//   //         console.log(err);
//   //       });
//   //     } else {
//   //       this.id = Date.now().toString();
//   //       products.push(this);
//   //       fs.writeFile(p, JSON.stringify(products), (err) => {
//   //         console.log(err);
//   //       });
//   //     }
//   //   });
//   // }

//   static fetchAll() {
//     return db.execute("SELECT * FROM products");
//   }
//   // static fetchAll(callbackFunc) {
//   //   getProductsFromFile(callbackFunc);
//   // }
//   static findById(id) {
//     return db.execute("SELECT * FROM products WHERE products.id=?", [id]);
//   }

//   // static findById(id, callbackFunc) {
//   //   getProductsFromFile((products) => {
//   //     const product = products.find((p) => p.id === id);
//   //     return callbackFunc(product);
//   //   });
//   // }
//   static deleteById(id) {}
//   // static deleteById(id) {
//   //   getProductsFromFile((products) => {
//   //     const product = products.find((prod) => prod.id === id);
//   //     const updatedProducts = products.filter((prod) => prod.id !== id);
//   //     fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
//   //       if (!err) {
//   //         Cart.deleteProduct(id, product.price);
//   //       }
//   //     });
//   //   });
//   // }
// };
