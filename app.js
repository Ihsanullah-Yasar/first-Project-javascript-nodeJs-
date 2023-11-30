// const http = require("http"); // now we deos not need it because its done by express
const path = require("path");
const express = require("express");
const handlebars = require("express-handlebars");
const errorController = require("./controllers/errorController");
const sequelize = require("./utilities/database");
// importing models
const Product=require('./Models/productModel');
const User=require('./Models/userModel');
const Cart= require('./Models/cartModel');
const CartItem=require('./Models/cartItemModel');
const Order=require('./Models/order');
const OrderItems=require('./Models/order-items');
// importing models end!!!
const app = express();
const routes = express.Router();
// bellow three line is for template engine(we will switch to ejs and its recommended by instructor coz of power and cleaness)
// app.engine(
//   "hbs",
//   handlebars.engine({
//     layoutsDir: "views/layouts/",
//     defaultLayout: "main-layout",
//     extname: "hbs",
//   })
// ); /// hbs (handlebars) is a template engine that render dynamic content on html page
app.set("view engine", "ejs");
// app.set("view engine", "pug");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const bodyParser = require("body-parser"); // we should install (npm install --save body-parser) for parsing body


app.use(bodyParser.urlencoded({ extended: false })); // this will parse body and call next() method
app.use(express.static(path.join(__dirname, "public")));

app.use((req,res,next)=>{
  User.findOne({where: {id :1}}).then(user=>{
    req.user=user;
    next();
  }).catch(err=>console.log(err));
})

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use("/help", (req, res, next) => {
  res.render("help", { pageTitle: "Help Page", path: "" });
});
app.use(errorController.get404);

// we can shorten this to one line of code and it(express) deos everything for us;
// const server = http.createServer(app);
// server.listen(3000);
// app.listen(3000); // this wiil call createServer and Listen methods

Product.belongsTo(User,{constraints: true,onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product,{through: OrderItems});

sequelize
  // .sync({force: true})
  .sync()
  .then(result=>{
    return User.findOne({where: {id: 1}});
  })
  .then(user=>{
    if(!user){
      return User.create({name:'test',email: 'test@gmail.com'});
    }
    return user;
  })
  .then((user) => {
    // console.log(user);
    return user.createCart();
  }).then(cart=>{
    app.listen(3000);
  })
  .catch((err) => console.log(err));
