const getDb = require("../utilities/database").getDb;
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }
  save() {
    getDb()
      .collection("users")
      .insertOne(this)
      .then((result) => {
        console.log("user stored successfuly", result);
      })
      .catch((err) => console.log(err));
  }
  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });
    let newquntity = 1;
    let updatedCartItems = [...this.cart.items];
    if (cartProductIndex >= 0) {
      newquntity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newquntity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: 1,
      });
    }
    const updatedCart = {
      items: updatedCartItems,
    };
    return getDb()
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }
  getCart() {
    const productIds = this.cart.items.map((i) => {
      return i.productId;
    });
    console.log(productIds);
    return getDb()
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((p) => {
          return {
            ...p,
            quantity: this.cart.items.find((i) => {
              return i.productId.toString() === p._id.toString();
            }).quantity,
          };
        });
      })
      .catch((err) => console.log(err));
  }
  deleteById(productId) {
    const updatedCartItems = this.cart.items.filter(
      (item) => item.productId.toString() !== productId.toString()
    );
    return getDb()
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: { items: updatedCartItems } } }
      );
  }
  addOrder() {
    return this.getCart()
      .then((products) => {
        const order = {
          items: products,
          user: {
            _id: new ObjectId(this._id),
            name: this.name,
          },
        };
        return getDb().collection("orders").insertOne(order);
      })
      .then((result) => {
        this.cart = { items: [] };
        return getDb()
          .collection("users")
          .updateOne(
            { _id: new ObjectId(this._id) },
            { $set: { cart: { items: [] } } }
          );
      });
  }
  getOrders() {
    return getDb()
      .collection("orders")
      .find({ "user._id": new ObjectId(this._id) })
      .toArray();
  }

  static findById(userId) {
    return getDb()
      .collection("users")
      .findOne({ _id: new ObjectId(userId) })
      .then((user) => {
        console.log(user);
        return user;
      });
  }
}

module.exports = User;

////below code is related to the earlier version of the project was working with mysql and sequelize(ORM)

// const Sequelize = require("sequelize");
// const sequelize = require("../utilities/database");

// const User = sequelize.define("user", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   name: Sequelize.STRING,
//   email: Sequelize.STRING,
// });

// module.exports = User;
