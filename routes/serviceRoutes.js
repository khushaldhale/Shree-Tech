const express = require("express");
const { getAllServices, createService, deletService } = require("../controllers/service");
const { authentication } = require("../middlewares/authentication");
const router = express.Router();

router.get("/", authentication, getAllServices);
router.post("/", authentication, createService);
router.delete("/:id", authentication, deletService)

module.exports = router