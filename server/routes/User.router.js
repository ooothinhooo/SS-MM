const express = require("express");
const findOneUser = require("../controllers/Users/findOneUser.controllers.js");
const updateUser = require("../controllers/Users/updateUser.controllers.js");
const changePassword = require("../controllers/Users/ChangePassword.controller.js");
const getUser = require("../controllers/Users/getUser.controller.js");

const router = express.Router();

router.get("/find", findOneUser);
router.put("/updateinfo", updateUser);
router.put("/updatepass", changePassword);
router.get("/get", getUser);
module.exports = router;
