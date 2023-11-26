/// database connection using sequelize

const Sequelize = require("sequelize");
const sequelize = new Sequelize("node-complete", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
////// pure node js or express js code to connect to database
// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "node-complete",
//   password: "",
// });

// module.exports = pool.promise();
