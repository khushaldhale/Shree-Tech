const express = require("express");
const { getAllServices, createService, deletService } = require("../controllers/service");
const { authentication } = require("../middlewares/authentication");
const router = express.Router();


// allowed direct access  for get , as  we have to show it as open route 
router.get("/", getAllServices);
router.post("/", authentication, createService);
router.delete("/:id", authentication, deletService)
module.exports = router