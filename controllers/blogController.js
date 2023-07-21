const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');
const morgan = require('morgan'); 
const Blog = require('../models/blogSchema');

// Render create blog page
exports.renderCreatePage = (req, res) => {
  res.render('create', { message: '' });
};

// Handle create blog form submission
exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const author = req.user.userId;

    const newBlog = await Blog.create({
      title,
      content,
      author,
    });

    res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Render single blog page
exports.renderBlogPage = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId).populate('author', 'username');

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.render('blog', { blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Render edit blog page
exports.renderEditPage = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.render('update', { blog, message: '' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Handle update blog form submission
exports.updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const { title, content } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { title, content },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({ message: 'Blog updated successfully', blog: updatedBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Handle delete blog request
exports.deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const deletedBlog = await Blog.findByIdAndRemove(blogId);

    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({ message: 'Blog deleted successfully', blog: deletedBlog });
  } catch (error) {

    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Function to get all blogs
exports.getAllBlogs = async (req, res) => {
    try {
      const blogs = await Blog.find().populate('author', 'username').exec();
      res.render('home', { blogs });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };