const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
let _db;

mongoConnect = (callback) => {
  mongoClient
    .connect(
      "mongodb+srv://ihsanullahyasar70:Cc1GxwYHtYaQKLXG@cluster0.fn4lpxy.mongodb.net/?retryWrites=true&w=majority"
    )
    .then((client) => {
      console.log("db Connected successly");
      _db = client.db("shop");
      callback();
    })
    .catch((err) => {
      // console.log(err);
      throw err;
    });
};
const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "no database found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
// /// database connection using sequelize

// const Sequelize = require("sequelize");
// const sequelize = new Sequelize("node-complete", "root", "", {
//   dialect: "mysql",
//   host: "localhost",
// });

// module.exports = sequelize;
// ////// pure node js or express js code to connect to database using mysql2 driver

// // const mysql = require("mysql2");

// // const pool = mysql.createPool({
// //   host: "localhost",
// //   user: "root",
// //   database: "node-complete",
// //   password: "",
// // });

// // module.exports = pool.promise();
