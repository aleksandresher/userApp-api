const express = require("express");
const isAuth = require("../middleware/is-auth");

const usersController = require("../controllers/users");

const router = express.Router();

router.get("/getUsers", isAuth, usersController.getUsers);
router.get("/getUsers/:userId", isAuth, usersController.getSingleUser);
router.delete("/getUsers/:userId", isAuth, usersController.deleteUser);
router.put("/getUsers/:userId", isAuth, usersController.updateUser);
router.delete("/delete", isAuth, usersController.deleteAllUsers);
router.put("/block", isAuth, usersController.blockUsers);
router.put("/unblock", isAuth, usersController.unblockUsers);

module.exports = router;
