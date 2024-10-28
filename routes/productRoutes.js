const express = require("express");
const { getAllproducts, createProduct, deleteProduct } = require("../controllers/products");
const { authentication } = require("../middlewares/authentication");
const router = express.Router();


router.get("/", getAllproducts);
router.post("/", authentication, createProduct);
router.delete("/:id", authentication, deleteProduct)

module.exports = router