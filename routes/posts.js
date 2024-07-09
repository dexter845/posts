const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();



// Get All posts
router.get('/', postController.getPosts);

// Get a single post
router.get('/:id', postController.getSinglePost);

// Add a post
router.post('/', postController.createPost);

// Update post
router.put('/:id', postController.updatePost);

// Delete post
router.delete('/:id', postController.deletePost);

router.delete('/:id', )

module.exports = router;