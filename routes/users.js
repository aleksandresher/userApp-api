const express = require("express");


const usersController = require("../controllers/users");

const router = express.Router();

router.get("/getUsers", usersController.getUsers);
router.get("/getUsers/:userId", usersController.getSingleUser);
router.delete("/getUsers/:userId", usersController.deleteUser);
router.put("/getUsers/:userId", usersController.updateUser);
router.delete("/delete", usersController.deleteAllUsers);
router.put("/block", usersController.blockUsers);
router.put("/unblock", usersController.unblockUsers);

module.exports = router;
