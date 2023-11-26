const path = require("path");

// const rootDir = require("../utilities/path");
const adminController = require("../controllers/adminController");
const express = require("express");

const router = express.Router();
//admin/add-products => GET
router.get("/add-product", adminController.getAddProduct);
//admin/products => GET
router.get("/products", adminController.getProducts);
//admin/add-products => POST
router.post("/add-product", adminController.postAddProduct);

router.get("/edit-product/:productId", adminController.getEditProduct);

router.post("/edit-product", adminController.postEditProduct);

router.post("/delete-product", adminController.postDeleteProduct);

module.exports = router;
