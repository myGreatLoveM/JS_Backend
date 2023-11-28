const express = require('express')
const router = express.Router()
// const { createComment } = require('../controllers/commentController')
// const { createPost, getAllPosts, getSinglePost, deletePost, updatePost } = require('../controllers/postController')
const { createLike, unlikePost } = require('../controllers/likeController')

const { createPost } = require('../controllers/postController')

// router.route('/posts').get(getAllPosts)
// router.route('/posts/:id').get(getSinglePost)
// router.route('/posts/:id').delete(deletePost)
router.route('/posts/create').post(createPost)
// router.route('/posts/:id').put(updatePost)


router.route('/likes/like').post(createLike)
router.route('/likes/unlike').post(unlikePost)


// router.route('/comments/create').post(createComment)


module.exports = router
