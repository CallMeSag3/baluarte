const router = require("express").Router();
const Post = require("../models/Post");

const decode = (title) => {
  const decodedURL = decodeURIComponent(title);
  const decodedTitle = decodedURL.replace(
    /-|_co_|_qu_|_ex_|_mo_|_ba_|_pu_|_pa_|_pc_|_quu_|_exx_|_nn_|_NN_|_aa_|_ee_|_ii_|_oo_|_uu_|_AA_|_EE_|_II_|_OO_|_UU_/g,
    function (matched) {
      return mapObj[matched];
    }
  );
  return decodedTitle;
};

var mapObj = {
  _co_: ",",
  _qu_: "?",
  _do_: ".",
  _ex_: "!",
  _mo_: ":",
  _ba_: "/",
  _pu_: ";",
  _pa_: "(",
  _pc_: ")",
  _quu_: "¿",
  _exx_: "¡",
  _nn_: "ñ",
  _NN_: "Ñ",
  _aa_: "á",
  _ee_: "é",
  _ii_: "í",
  _oo_: "ó",
  _uu_: "ú",
  _AA_: "Á",
  _EE_: "É",
  _II_: "Í",
  _OO_: "Ó",
  _UU_: "Ú",
  "-": " ",
};

// create post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update post
// router.put("/:id", async (req, res) => {
router.put("/:title", async (req, res) => {
  // const post = await Post.findById(req.params.id);
  const decodedTitle = decode(req.params.title);
  const post = await Post.find({ title: decodedTitle });
  if (
    post.username === req.body.username ||
    req.body.username === "pfalconar"
  ) {
    try {
      // const updatedPost = await Post.findByIdAndUpdate(
      const updatedPost = await Post.findOneAndUpdate(
        { title: decodedTitle },
        {
          $push: {
            comments: req.body.comment,
            links: req.body.links,
            photos: req.body.photos,
          },
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  } else if (req.body.comment != null) {
    try {
      const updatedPost = await Post.findOneAndUpdate(
        { title: decodedTitle },
        {
          $push: {
            comments: req.body.comment,
          },
        }
      );
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can only update your own posts!");
  }
});

//delete post
// router.delete("/:id", async (req, res) => {
router.delete("/:title", async (req, res) => {
  // const post = await Post.findById(req.params.id);
  const decodedTitle = decode(req.params.title);
  const post = await Post.findOne({ title: decodedTitle });
  if (
    post.username === req.body.username ||
    req.body.username === "pfalconar"
  ) {
    try {
      const post = await Post.findOne({ title: decodedTitle });
      try {
        await post.delete();
        res.status(200).json("Post deleted!");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can only delete your own posts!");
  }
});

// get post
// router.get("/:id", async (req, res) => {
router.get("/:title", async (req, res) => {
  const decodedTitle = decode(req.params.title);
  try {
    // const post = await Post.findById(req.params.id);
    const post = await Post.findOne({ title: decodedTitle });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all posts
router.get("/", async (req, res) => {
  const catName = req.query.cat;
  try {
    let posts;
    if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
