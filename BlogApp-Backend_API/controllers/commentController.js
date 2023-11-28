const Comment = require('../models/commentModel')
const Post = require('../models/postModel')
const Like = require('../models/likeModel')

// comment route handler
exports.createComment = async (req, res) => {
  try {
    const { post_id, user_name, comment_body } = req.body
    const post = await Post.findById({ _id: post_id })
    if (!post) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'There is no such Post',
      })
    }
    const comment = new Comment({
      post_id,
      user_name,
      comment_body,
    })
    const savedComment = await comment.save()

    const updatedPost = await Post.findByIdAndUpdate(
      post_id,
      { $push: { comments: savedComment._id } },
      { new: true }
    )
      .populate('comments')
      .populate('likes')
      .exec()

    res.status(201).json({
      success: true,
      data: updatedPost,
      message: 'Comment posted successfully',
    })

    console.log(`${user_name} commented on post "${updatedPost.title}"`)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      data: null,
      message: 'Error while creating comment',
    })
  }
}

