let express = require("express");

let router = express.Router();


let controller = require("../controllers/authController.js");

router.post("/register", controller.registerUser);

router.post("/login", controller.loginUser);



module.exports = router;