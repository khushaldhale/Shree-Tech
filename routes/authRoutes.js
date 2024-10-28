const express = require("express");
const { register, login, generateAccessToken } = require("../controllers/auth");
const router = express.Router();


router.post("/register", register);
router.post("/login", login);
// shall we put authentication or not 
router.get("/generate/access", generateAccessToken)

module.exports = router