const express = require("express");
const router = express.Router();
const User = require("../models/customerSchema");
var moment = require("moment");
const userController = require("../controllers/userController");  

//GET requests

router.get("/", userController.user_index_get);

router.get("/edit/:id", userController.user_edit_get);

router.get("/view/:id", userController.user_view_get);      
//Delete request
router.delete("/edit/:id", userController.user_delete_delete);


//Update request
router.put("/edit/:id", userController.user_update_put);
module.exports = router;
