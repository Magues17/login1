let express = require("express");

let router = express.Router();

let controller = require("../controllers/profileController.js");

// let controller = require("../controllers/authController.js");

// router.post("/profileroute", controller.registerUser);

router.get("/profile/:username", controller.getProfile);

router.delete("/profile/:username", controller.deleteProfile);
    
router.put("/profile/:username", controller.updateProfile);

// router.patch("/profileroute", controller.registerUser);




module.exports = router;