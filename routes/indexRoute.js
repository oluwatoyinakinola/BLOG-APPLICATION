const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

//Render all blogs

router.get('/', blogController.getAllBlogs);

module.exports = router;
