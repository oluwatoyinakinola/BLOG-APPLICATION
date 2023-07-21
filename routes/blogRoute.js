const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, blogController.createBlog);
router.put('/:id', authMiddleware, blogController.updateBlog);
router.delete('/:id', authMiddleware, blogController.deleteBlog);

// Create a blog
router.get('/create', authMiddleware, blogController.renderCreatePage);
router.post('/create', authMiddleware, blogController.createBlog);

module.exports = router;

