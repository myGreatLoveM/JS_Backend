const Post = require('../models/postModel')
// const Comment = require('../models/commentModel')
// const Like = require('../models/likeModel')

exports.createPost = async (req, res) => {
  try {
    const { title, user_name, post_body } = req.body
    const post = new Post({ title, user_name, post_body })
    const newPost = await post.save()
    res.status(201).json({
      success: true,
      data: newPost,
      message: 'New post created successfully',
    })
    console.log('New post created successfully with title : ', newPost.title)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      data: null,
      message: 'Something went wrong while creating a new post',
    })
  }
}

// exports.getAllPosts = async (req, res) => {
//   try {
//     const posts = await Post.find()
//       .populate('comments')
//       .populate('likes')
//       .exec()

//     res.status(200).json({
//       success: true,
//       data: posts,
//       message: 'This are all the posts that have been posted',
//     })

//     console.log(`This are all the posts that have been posted => ${posts}`)
//   } catch (error) {
//     console.log(err)
//     res.status(500).json({
//       success: false,
//       data: null,
//       message: 'An error has occurred while fetching the posts',
//     })
//   }
// }

// exports.getSinglePost = async (req, res) => {
//   try {
//     const post_id = req.params.id
//     const post = await Post.findById({ _id: post_id })
//       .populate('comments')
//       .populate('likes')
//       .exec()
//     if (post == null) {
//       console.log('No such post found')
//       return res.status(404).json({
//         status: false,
//         data: null,
//         message: 'No post found',
//       })
//     }
//     res.status(200).json({
//       success: true,
//       data: post,
//       message: 'Here is the post',
//     })
//     console.log(`Here is the post => "${post.title}"`)
//   } catch (err) {
//     console.log(err)
//     res.status(500).json({
//       success: false,
//       data: null,
//       message: 'There was an error while fetching the post',
//     })
//   }
// }

// exports.deletePost = async (req, res) => {
//   try {
//     const post_id = req.params.id
//     const post = await Post.findById({ _id: post_id })
//     const comments = post.comments
//     const likes = post.likes

//     comments.map(async (comment) => {
//       await Comment.findByIdAndDelete({ _id: comment._id })
//     })

//     likes.map(async (like) => {
//       await Like.findByIdAndDelete({ _id: like._id })
//     })

//     const deletedPost = await Post.findByIdAndDelete({ _id: post._id })
//       .populate('comments')
//       .populate('likes')
//       .exec()

//     res.status(200).json({
//       success: true,
//       data: deletedPost,
//       message: 'Post has been deleted successfully',
//     })
//     console.log('Post has been deleted successfully')
//   } catch (err) {
//     console.log(err)
//     res.status(500).json({
//       success: false,
//       data: null,
//       message: 'Something went wrong while deleting post',
//     })
//   }
// }

// exports.updatePost = async (req, res) => {
//   try {
//     const post_id = req.params.id
//     const updatedPost = await Post.findByIdAndUpdate(
//       post_id,
//       { ...req.body },
//       { new: true }
//     )
//       .populate('comments')
//       .populate('likes')
//       .exec()
//     res.status(200).json({
//       success: true,
//       data: updatedPost,
//       message: 'Updated the post successfully'
//     })
//     console.log('Updated the post successfully')
//   } catch (err) {
//     console.log(err)
//     res.status(500).json({
//       success: false,
//       data: null,
//       message: 'Something went wrong while deleting post',
//     })
//   }
// }
