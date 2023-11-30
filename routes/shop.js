// const path = require("path");
// const rootDir = require("../utilities/path");
const express = require("express");
// const adminData = require("./admin");
const shopController = require("../controllers/shopController");
const routes = express.Router();

routes.get("/", shopController.getIndex);

routes.get("/products", shopController.getProducts);

routes.get("/product/:productId", shopController.getProduct);

routes.get("/cart", shopController.getCart);

routes.post("/cart", shopController.postCart);

routes.post("/cart-delete-item", shopController.postCartDeleteProduct);

routes.get("/orders", shopController.getOrders);
routes.post('/create-order',shopController.postOrder);

routes.get("/checkout", shopController.getCheckout);

module.exports = routes;
