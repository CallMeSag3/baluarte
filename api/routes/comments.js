const router = require("express").Router();
const Comment = require("../models/Comment");
const Post = require("../models/Post");

// create comment
router.post("/:id/coms/", async (req, res) => {
  const newComment = new Comment(req.body);
  newComment.post = req.params.id;
  try {
    const savedComment = await newComment.save();
    const postRelated = await Post.findByIdAndUpdate(req.params.id, {
      $push: { comments: savedComment },
    });
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update comment
router.put("/:id/coms/:comId", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.comId);
    if (comment.username === req.body.username) {
      try {
        const updatedComment = await Comment.findByIdAndUpdate(
          req.params.comId,
          {
            $set: { desc: req.body.desc },
          },
          { new: true }
        );
        res.status(200).json(updatedComment);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can edit only your comments!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete comment
router.delete("/:id/coms/:comId", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.comId);
    if (comment.username === req.body.username) {
      try {
        const postRelated = await Post.findByIdAndUpdate(req.params.id, {
          $pull: {
            comments: req.params.comId,
          },
        });
        await comment.delete();
        res.status(200).json("Comment deleted!");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your comments!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get comment
router.get("/:id/coms/:comId", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.comId);
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get comments
router.get("/:id/coms", async (req, res) => {
  try {
    const comments = await Comment.find({
      post: req.params.id,
    });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
