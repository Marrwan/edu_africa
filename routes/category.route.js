const express = require('express');
const categoryController = require('../controllers/category.controller');
const { authenticateJWT } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', authenticateJWT, categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.put('/:id', authenticateJWT, categoryController.updateCategory);
router.delete('/:id', authenticateJWT, categoryController.deleteCategory);

module.exports = router;
