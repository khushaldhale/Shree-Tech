const express = require("express");
const { getAllTeam, createTeam, updateTeam, deleteTeam } = require("../controllers/team");
const { authentication } = require("../middlewares/authentication");
const router = express.Router()

router.get("/", authentication, getAllTeam);
router.post("/", authentication, createTeam)
router.put("/:id", authentication, updateTeam);
router.delete("/:id", authentication, deleteTeam)



module.exports = router