// const products = [];
const ProductModel = require("../Models/productModel");
const Cart = require("../Models/cartModel");
exports.getProducts = (req, res, next) => {
  // console.log(adminData.products);
  // res.sendFile(path.join(rootDir, "views", "shop.html"));
  //   const products = adminData.products;
  ProductModel.findAll()
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
  // ProductModel.fetchAll()
  //   .then(([products, fieldData]) => {
  //     res.render("shop/product-list", {
  //       prods: products,
  //       pageTitle: "All Products",
  //       path: "/products",
  //       hasProducts: products.length > 0,
  //       shopActive: true,
  //       productCSS: true,
  //     });
  //   })
  //   .catch((err) => console.log(err));
};
// exports.getProducts = (req, res, next) => {
//   // console.log(adminData.products);
//   // res.sendFile(path.join(rootDir, "views", "shop.html"));
//   //   const products = adminData.products;
//   ProductModel.fetchAll((products) => {
//     res.render("shop/product-list", {
//       prods: products,
//       pageTitle: "All Products",
//       path: "/products",
//       hasProducts: products.length > 0,
//       shopActive: true,
//       productCSS: true,
//     });
//   });
// };

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  ProductModel.findOne({ where: { id: prodId } })
    .then((product) => {
      return res.render("shop/product-detail", {
        product: product,
        pageTitle: "single product",
        path: "shop/product-detail",
      });
    })
    .catch((err) => console.log(err));
  // ProductModel.findById(prodId)
  //   .then(([product]) => {
  //     return res.render("shop/product-detail", {
  //       product: product[0],
  //       pageTitle: "single product",
  //       path: "shop/product-detail",
  //     });
  //   })
  //   .catch((err) => console.log(err));
};
exports.getIndex = (req, res, next) => {
  ProductModel.findAll()
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
  // ProductModel.fetchAll()
  //   .then(([rows, fieldData]) => {
  //     res.render("shop/index", {
  //       prods: rows,
  //       pageTitle: "Shop",
  //       path: "/",
  //     });
  //   })
  //   .catch((err) => console.log(err));
};
// exports.getIndex = (req, res, next) => {
//   ProductModel.fetchAll((products) => {
//     res.render("shop/index", {
//       prods: products,
//       pageTitle: "Shop",
//       path: "/",
//     });
//   });
// };
/////the Bellow is the same index method but its for the handlebars template engine and with handlebars the logic will
// be in controller not in view(template engine)
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
  Cart.getCart((cart) => {
    ProductModel.fetchAll((products) => {
      const cartProducts = [];
      let cartProductData = [];
      for (product of products) {
        cartProductData = cart.products.find((prod) => prod.id === product.id);
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "your cart",
        products: cartProducts,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  ProductModel.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/products");
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  ProductModel.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", { path: "/orders", pageTitle: "your orders" });
};

exports.getCheckout = (req, res, next) => {
  res.render("/checkout", { pageTitle: "Checkout", path: "/checkout" });
};
