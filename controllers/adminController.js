const ProductModel = require("../Models/productModel");

exports.getAddProduct = (req, res, next) => {
  //   console.log("In the add products middleware");
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });

  //   res.send(
  //     "<form action='/admin/add-product' method='POST'><input type='text' name='title'><button type='submit'>add product</button></form>"
  //   );
  //   next(); // Allow the request to continue to the next middleware in line
};

exports.postAddProduct = (req, res, next) => {
  //   res.sendFile(__dirname, "../", "views", "add-product.html");
  // products.push({ title: req.body.title }); //instead we will use productModel
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  ProductModel.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
  })
    .then((result) => {
      console.log(result);
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
  // const product = new ProductModel(null, title, imageUrl, description, price);
  // product
  //   .save()
  //   .then(() => {
  //     res.redirect("/");
  //   })
  //   .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  ProductModel.findAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "admin products",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
  // ProductModel.fetchAll((products) => {
  //   res.render("admin/products", {
  //     prods: products,
  //     pageTitle: "admin products",
  //     path: "/admin/products",
  //   });
  // });
};

exports.getEditProduct = (req, res, next) => {
  //   console.log("In the add products middleware");
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  ProductModel.findOne({ where: { id: prodId } })
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  // ProductModel.findById(prodId, (product) => {
  //   if (!product) {
  //     return res.redirect("/");
  //   }
  //   res.render("admin/edit-product", {
  //     pageTitle: "Edit Product",
  //     path: "/admin/edit-product",
  //     editing: editMode,
  //     product: product,
  //   });
  // });

  //   res.send(
  //     "<form action='/admin/add-product' method='POST'><input type='text' name='title'><button type='submit'>add product</button></form>"
  //   );
  //   next(); // Allow the request to continue to the next middleware in line
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  const updatedPrice = req.body.price;
  ProductModel.findOne({ where: { id: prodId } })
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDescription;
      product.imageUrl = updatedImageUrl;
      return product.save();
    })
    .then((result) => {
      // console.log("product updated successfully.", result);
      return res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
  // const updatedProduct = new ProductModel(
  //   prodId,
  //   updatedTitle,
  //   updatedImageUrl,
  //   updatedDescription,
  //   updatedPrice
  // );
  // updatedProduct.save();
  // return res.redirect("/admin/products");
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  ProductModel.findOne({ where: { id: prodId } })
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      console.log("product deleted successfully", result);
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
  // ProductModel.destroy({ where: { id: prodId } }); // that is also true but we should handle promises and erros
  // ProductModel.deleteById(prodId);
  res.redirect("/admin/products");
};
