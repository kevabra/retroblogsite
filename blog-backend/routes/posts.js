const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create post
router.post('/', auth, async (req, res) => {
  const { title, content } = req.body;

  try {
    // Create a new post
    const newPost = new Post({
      title,
      content,
      user: req.user.id // Include the user ID
    });

    // Save the post to the database
    const post = await newPost.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Fetch posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'username'); // Ensure `user` field is populated
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a post
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, content } = req.body;

    // Find the post by ID
    const post = await Post.findById(req.params.id);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user is authorized to update the post
    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Update the post
    post.title = title || post.title;
    post.content = content || post.content;

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a post
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;

  try {
    // Find the post by ID
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user is authorized to delete the post
    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'User not authorized' });
    }

    // Delete the post
    await Post.findByIdAndDelete(id);

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('Error deleting post:', err); // Log error details
    res.status(500).json({ message: 'Error deleting post' });
  }
});


module.exports = router;
