const Like = require('../models/likeModel')
const Post = require('../models/postModel')
const Comment = require('../models/commentModel')

exports.createLike = async (req, res) => {
  try {
    const { post_id, user_name } = req.body
    const post = await Post.findById({ _id: post_id })
    if (!post) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'There is no such Post',
      })
    }
    const like = new Like({ post_id, user_name })
    const newLike = await like.save()
    const updatedPost = await Post.findByIdAndUpdate(
      post_id,
      { $push: { likes: newLike._id } },
      { new: true }
    )
      .populate('likes')
      .populate('comments')
      .exec()
    res.status(201).json({
      success: true,
      data: updatedPost,
      message: 'Posted liked',
    })

    console.log(`${user_name} has liked ${updatedPost.title} post`)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      data: null,
      message: 'Something went wrong could not like this post',
    })
  }
}

exports.unlikePost = async (req, res) => {
  try {
    const { post_id, like_id } = req.body
    const deletedLike = await Like.findByIdAndDelete({ _id: like_id })
    const updatedPost = await Post.findByIdAndUpdate(
      post_id,
      { $pull: { likes: deletedLike._id } },
      { new: true }
    )
      .populate('likes')
      .populate('comments')
      .exec()
    res.status(200).json({
      success: true,
      data: updatedPost,
      message: 'unliked post',
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
    })
  }
}
