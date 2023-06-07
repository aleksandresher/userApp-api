const User = require("../models/user");
const formatDate = (date) => {
  return date.toLocaleString();
};

exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      const formattedUsers = users.map((user) => ({
        ...user.toObject(),
        createdAt: formatDate(user.createdAt),
        lastLogin: formatDate(
          user.lastLogin ? user.lastLogin : "Have not logged in yet"
        ),
      }));
      res.status(200).json({
        message: "Fetched users successfully.",
        users: formattedUsers,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.getSingleUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        const error = new Error("Could not find post.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: "Post fetched.", user: user });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        const error = new Error("Could not find post.");
        error.statusCode = 404;
        throw error;
      }

      return User.findByIdAndRemove(userId);
    })
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: "user deleted." });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        const error = new Error("Could not find post.");
        error.statusCode = 404;
        throw error;
      }
      user.active = !user.active;
      return user.save();
    })
    .then((result) => {
      res.status(200).json({ message: "user updated!", user: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteAllUsers = (req, res, next) => {
  const { userIds } = req.body;
  const adminId = req.body.adminId;
  const isAdminDeleted = userIds.includes(adminId);
  User.deleteMany({ _id: { $in: userIds } })
    .then(() => {
      if (isAdminDeleted) {
        res.status(200).json({ message: "Admin was deleted." });
      } else {
        res
          .status(200)
          .json({ message: "All users have been deleted successfully." });
      }
    })
    .catch((error) => {
      console.error("Error deleting all users:", error);
      res
        .status(500)
        .json({ message: "An error occurred while deleting all users." });
      next();
    });
};

exports.blockUsers = (req, res, next) => {
  const { userIds } = req.body;
  const adminId = req.body.adminId;
  const isAdminBlocked = userIds.includes(adminId);
  console.log(`user ids: ${userIds}`);
  User.updateMany({ _id: { $in: userIds } }, { $set: { active: false } })
    .then(() => {
      if (isAdminBlocked) {
        res.status(200).json({ message: "Admin was Blocked." });
      } else {
        res
          .status(200)
          .json({ message: "All users have been deleted successfully." });
      }
    })
    .catch((error) => {
      console.error("Error updating all users:", error);
      console.log(userIds);
      res
        .status(500)
        .json({ message: "An error occurred while updatingnp all users." });
    });
};

exports.unblockUsers = (req, res, next) => {
  const { userIds } = req.body;
  console.log(`user ids: ${userIds}`);
  User.updateMany({ _id: { $in: userIds } }, { $set: { active: true } })
    .then(() => {
      res.status(200).json({
        message: "All users have been updated successfully.",
      });
    })
    .catch((error) => {
      console.error("Error updating all users:", error);
      console.log(userIds);
      res
        .status(500)
        .json({ message: "An error occurred while updatingnp all users." });
    });
};
