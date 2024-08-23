const express = require("express");
const adminControllers = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddlware = require("../middlewares/admin-middleware");
const router = express.Router();


router.route('/users').get(authMiddleware, adminMiddlware, adminControllers.getAllUsers);

router.route('/users/:id').get(authMiddleware, adminMiddlware, adminControllers.getUserById);

router.route('/users/update/:id').patch(authMiddleware, adminMiddlware, adminControllers.updateUserById);

router.route('/users/delete/:id').delete(authMiddleware, adminMiddlware, adminControllers.deleteUserById);

router.route('/contacts').get(authMiddleware, adminMiddlware, adminControllers.getAllContacts);

module.exports = router;