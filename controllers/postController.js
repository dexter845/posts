const Post = require('../models/post');

// @desc get all posts
// @route GET /api/posts
const getPosts = async (req, res, next) => {
  const limit = parseInt(req.query.limit);
  const posts = await Post.find({});
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }

  res.status(200).json(posts);
}

// @desc get single post
// @route GET /api/posts/:id

const getSinglePost = async (req, res, next) => {
  const id = req.params.id;
  const post = await Post.findOne({postId: id});
  console.log(post);
  if (!post) {
    const error = new Error('Post not found');
    error.status = 404;
    return next(error);
  }
  res.status(200).json(post);
}

// @desc create new post
// @route POST /api/posts/

const createPost = async (req, res, next) => {
  try {
    const title = req.body.title;
    if (!title) {
      const error = new Error('Please include a title for the post');
      error.status = 400;
      return next(error);
    }
    const newPost = new Post({ title });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

// @desc update a post
// @route PUT /api/posts/:id

const updatePost = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const title = req.body.title;
  if (!title) {
    const error = new Error('Please include a title for the post');
    error.status = 400;
    return next(error);
  }
  const updatedPost = await Post.findOneAndUpdate(
    { postId: id },
    { title: title},
    { new: true, runValidators: true }
  );
  if (!updatedPost) {
    const error = new Error('Post not found');
    error.status = 404;
    return next(error);
  }
  res.status(200).json(updatedPost);
}

// @desc delete a post
// @route DELETE /api/posts/

const deletePost = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = await Post.findOneAndDelete({postId: id});

  if (!post) {
    const error = new Error('Post not found');
    error.status = 404;
    return next(error);
  }

  res.status(200).json({message: `post with id ${id} deleted Successfully`});
}

module.exports = {
  getPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost
};