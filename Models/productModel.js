const mongodb = require("mongodb");
// const {getDb}= require('../utilities/database');
const getDb = require("../utilities/database").getDb;

class ProductModel {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = userId;
  }
  save() {
    const db = getDb();
    let dbOperation;
    if (this._id) {
      // update the product
      dbOperation = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOperation = db.collection("products").insertOne(this);
    }
    return dbOperation
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static fetchAll() {
    return getDb()
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((err) => console.log(err));
  }
  static findById(prodId) {
    return getDb()
      .collection("products")
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => console.log(err));
  }
  static deleteById(prodId) {
    return getDb()
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then((result) => {
        console.log("product deleted successfyl");
      })
      .catch((err) => console.log(err));
  }
}

// const ProductModel = sequelize.define("product", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   title: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   price: {
//     type: Sequelize.DOUBLE.UNSIGNED,
//     allowNull: false,
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });

module.exports = ProductModel;
/////// bellow code is related to project earlier version that worked with sequelize and mysql

// const Sequelize = require("sequelize");
// const sequelize = require("../utilities/database");

// const ProductModel = sequelize.define("product", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   title: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   price: {
//     type: Sequelize.DOUBLE.UNSIGNED,
//     allowNull: false,
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });

// module.exports = ProductModel;

//////below code is related to working with file system

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
