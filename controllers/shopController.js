// const products = [];
const ProductModel = require("../Models/productModel");
// const Cart = require("../Models/cartModel");
// const Order = require("../Models/order");

exports.getProducts = (req, res, next) => {
  ProductModel.fetchAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // ProductModel.findOne({ where: { id: prodId } })
  //   .then((product) => {
  //     return res.render("shop/product-detail", {
  //       product: product,
  //       pageTitle: "single product",
  //       path: "shop/product-detail",
  //     });
  //   })
  //   .catch((err) => console.log(err));
  ProductModel.findById(prodId)
    .then((product) => {
      return res.render("shop/product-detail", {
        product: product,
        pageTitle: "single product",
        path: "shop/product-detail",
      });
    })
    .catch((err) => console.log(err));
};
exports.getIndex = (req, res, next) => {
  ProductModel.fetchAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// // exports.getIndex = (req, res, next) => {
// //   ProductModel.fetchAll((products) => {
// //     res.render("shop/index", {
// //       prods: products,
// //       pageTitle: "Shop",
// //       path: "/",
// //     });
// //   });
// // };

// /////  the Bellow is the same index method but its for the handlebars template engine and with handlebars the logic will
// // be in controller not in view(template engine)

// exports.getIndex = (req, res, next) => {
//   ProductModel.fetchAll((products) => {
//     res.render("shop", {
//       prods: products,
//       pageTitle: "Shop",
//       path: "/",
//       hasProducts: products.length > 0,
//       shopActive: true,
//       productCSS: true,
//     });
//   });
// };

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((products) => {
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "your cart",
        products: products,
      });
    })
    .catch((err) => console.log(err));
};
//   // bellow code is related to the version that was working with file system
//   // Cart.getCart((cart) => {
//   //   ProductModel.fetchAll((products) => {
//   //     const cartProducts = [];
//   //     let cartProductData = [];
//   //     for (product of products) {
//   //       cartProductData = cart.products.find((prod) => prod.id === product.id);
//   //       if (cartProductData) {
//   //         cartProducts.push({ productData: product, qty: cartProductData.qty });
//   //       }
//   //     }
//   //     res.render("shop/cart", {
//   //       path: "/cart",
//   //       pageTitle: "your cart",
//   //       products: cartProducts,
//   //     });
//   //   });
//   // });
// };

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  ProductModel.findById(prodId)
    .then((product) => {
      req.user.addToCart(product);
    })
    .then((result) => {
      console.log(result);
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
  // let fetchedCart;
  // let newQuantity = 1;
  // req.user
  //   .getCart()
  //   .then((cart) => {
  //     fetchedCart = cart;
  //     return cart.getProducts({ where: { id: prodId } });
  //   })
  //   .then((products) => {
  //     let product;

  //     if (products.length > 0) {
  //       product = products[0];
  //     }
  //     if (product) {
  //       const oldQuantity = product.cartItems.quantity;
  //       newQuantity = oldQuantity + 1;
  //       return product;
  //     }
  //     return ProductModel.findOne({ where: { id: prodId } });
  //   })
  //   .then((product) => {
  //     return fetchedCart.addProduct(product, {
  //       through: { quantity: newQuantity },
  //     });
  //   })
  //   .then(() => {
  //     res.redirect("/products");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // //code related with file system working version
  // ProductModel.findById(prodId, (product) => {
  //   Cart.addProduct(prodId, product.price);
  // });
  // res.redirect("/products");
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteById(prodId)
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
  // ProductModel.findById(prodId, (product) => {
  //   Cart.deleteProduct(prodId, product.price);
  //   res.redirect("/cart");
  // });
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then((orders) => {
      console.log("these are your orders" + orders);
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "your orders",
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
  // res.render("shop/orders", { path: "/orders", pageTitle: "your orders" });
};

exports.postOrder = (req, res, next) => {
  req.user
    .addOrder()
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

// exports.getCheckout = (req, res, next) => {
//   res.render("/checkout", { pageTitle: "Checkout", path: "/checkout" });
// };

////bellow code is related to the earlier version of project that worked with sequelize and mysql

// exports.getProducts = (req, res, next) => {
//   // console.log(adminData.products);
//   // res.sendFile(path.join(rootDir, "views", "shop.html"));
//   //   const products = adminData.products;
//   ProductModel.findAll()
//     .then((products) => {
//       res.render("shop/product-list", {
//         prods: products,
//         pageTitle: "All Products",
//         path: "/products",
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   // ProductModel.fetchAll()
//   //   .then(([products, fieldData]) => {
//   //     res.render("shop/product-list", {
//   //       prods: products,
//   //       pageTitle: "All Products",
//   //       path: "/products",
//   //       hasProducts: products.length > 0,
//   //       shopActive: true,
//   //       productCSS: true,
//   //     });
//   //   })
//   //   .catch((err) => console.log(err));
// };
// // exports.getProducts = (req, res, next) => {
// //   // console.log(adminData.products);
// //   // res.sendFile(path.join(rootDir, "views", "shop.html"));
// //   //   const products = adminData.products;
// //   ProductModel.fetchAll((products) => {
// //     res.render("shop/product-list", {
// //       prods: products,
// //       pageTitle: "All Products",
// //       path: "/products",
// //       hasProducts: products.length > 0,
// //       shopActive: true,
// //       productCSS: true,
// //     });
// //   });
// // };

// exports.getProduct = (req, res, next) => {
//   const prodId = req.params.productId;
//   ProductModel.findOne({ where: { id: prodId } })
//     .then((product) => {
//       return res.render("shop/product-detail", {
//         product: product,
//         pageTitle: "single product",
//         path: "shop/product-detail",
//       });
//     })
//     .catch((err) => console.log(err));
//   // ProductModel.findById(prodId)
//   //   .then(([product]) => {
//   //     return res.render("shop/product-detail", {
//   //       product: product[0],
//   //       pageTitle: "single product",
//   //       path: "shop/product-detail",
//   //     });
//   //   })
//   //   .catch((err) => console.log(err));
// };
// exports.getIndex = (req, res, next) => {
//   ProductModel.findAll()
//     .then((products) => {
//       res.render("shop/index", {
//         prods: products,
//         pageTitle: "Shop",
//         path: "/",
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   // ProductModel.fetchAll()
//   //   .then(([rows, fieldData]) => {
//   //     res.render("shop/index", {
//   //       prods: rows,
//   //       pageTitle: "Shop",
//   //       path: "/",
//   //     });
//   //   })
//   //   .catch((err) => console.log(err));
// };
// // exports.getIndex = (req, res, next) => {
// //   ProductModel.fetchAll((products) => {
// //     res.render("shop/index", {
// //       prods: products,
// //       pageTitle: "Shop",
// //       path: "/",
// //     });
// //   });
// // };
// /////the Bellow is the same index method but its for the handlebars template engine and with handlebars the logic will
// // be in controller not in view(template engine)
// // exports.getIndex = (req, res, next) => {
// //   ProductModel.fetchAll((products) => {
// //     res.render("shop", {
// //       prods: products,
// //       pageTitle: "Shop",
// //       path: "/",
// //       hasProducts: products.length > 0,
// //       shopActive: true,
// //       productCSS: true,
// //     });
// //   });
// // };

// exports.getCart = (req, res, next) => {
//   req.user
//     .getCart()
//     .then((cart) => {
//       return cart.getProducts();
//     })
//     .then((products) => {
//       res.render("shop/cart", {
//         path: "/cart",
//         pageTitle: "your cart",
//         products: products,
//       });
//     })
//     .catch((err) => console.log(err));
//   // bellow code is related to the version that was working with file system
//   // Cart.getCart((cart) => {
//   //   ProductModel.fetchAll((products) => {
//   //     const cartProducts = [];
//   //     let cartProductData = [];
//   //     for (product of products) {
//   //       cartProductData = cart.products.find((prod) => prod.id === product.id);
//   //       if (cartProductData) {
//   //         cartProducts.push({ productData: product, qty: cartProductData.qty });
//   //       }
//   //     }
//   //     res.render("shop/cart", {
//   //       path: "/cart",
//   //       pageTitle: "your cart",
//   //       products: cartProducts,
//   //     });
//   //   });
//   // });
// };

// exports.postCart = (req, res, next) => {
//   const prodId = req.body.productId;
//   let fetchedCart;
//   let newQuantity = 1;
//   req.user
//     .getCart()
//     .then((cart) => {
//       fetchedCart = cart;
//       return cart.getProducts({ where: { id: prodId } });
//     })
//     .then((products) => {
//       let product;

//       if (products.length > 0) {
//         product = products[0];
//       }
//       if (product) {
//         const oldQuantity = product.cartItems.quantity;
//         newQuantity = oldQuantity + 1;
//         return product;
//       }
//       return ProductModel.findOne({ where: { id: prodId } });
//     })
//     .then((product) => {
//       return fetchedCart.addProduct(product, {
//         through: { quantity: newQuantity },
//       });
//     })
//     .then(() => {
//       res.redirect("/products");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   //code related with file system working version
//   // ProductModel.findById(prodId, (product) => {
//   //   Cart.addProduct(prodId, product.price);
//   // });
//   // res.redirect("/products");
// };

// exports.postCartDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   req.user
//     .getCart()
//     .then((cart) => {
//       return cart.getProducts({ where: { id: prodId } });
//     })
//     .then((products) => {
//       console.log("this is the reterned product array : " + products);
//       const product = products[0];
//       return product.cartItems.destroy();
//     })
//     .then((result) => {
//       res.redirect("/cart");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   // ProductModel.findById(prodId, (product) => {
//   //   Cart.deleteProduct(prodId, product.price);
//   //   res.redirect("/cart");
//   // });
// };

// exports.getOrders = (req, res, next) => {
//   req.user
//     .getOrders({ include: ["products"] })
//     .then((orders) => {
//       console.log("these are your orders" + orders);
//       res.render("shop/orders", {
//         path: "/orders",
//         pageTitle: "your orders",
//         orders: orders,
//       });
//     })
//     .catch((err) => console.log(err));
//   // res.render("shop/orders", { path: "/orders", pageTitle: "your orders" });
// };

// exports.postOrder = (req, res, next) => {
//   let fetchedCart;
//   req.user
//     .getCart()
//     .then((cart) => {
//       fetchedCart = cart;
//       return cart.getProducts();
//     })
//     .then((products) => {
//       req.user
//         .createOrder()
//         .then((order) => {
//           return order.addProducts(
//             products.map((product) => {
//               product.orderItems = { quantity: product.cartItems.quantity };
//               return product;
//             })
//           );
//         })
//         .catch((err) => console.log(err));
//     })
//     .then((product) => {
//       return fetchedCart.setProducts(null);
//     })
//     .then((result) => {
//       res.redirect("/orders");
//     })
//     .catch((err) => console.log(err));
// };

// exports.getCheckout = (req, res, next) => {
//   res.render("/checkout", { pageTitle: "Checkout", path: "/checkout" });
// };
