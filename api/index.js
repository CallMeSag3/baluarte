const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const commentRoute = require("./routes/comments");
const path = require("path");
const cors = require("cors");

app.use(cors());

dotenv.config();
app.use(express.json()); // to send json
app.use("/images", express.static(path.join(__dirname, "/images")));

app.options("/url...", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://baluartear.com");
  res.header("Access-Control-Allow-Methods", "POST", "GET", "PUT");
  res.header("Access-Control-Allow-Headers", "accept, content-type");
  res.header("Access-Control-Max-Age", "1728000");
  return res.sendStatus(200);
});

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDb.."))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

const options = {
  origin: "https://baluartear.com/",
};

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/comment", commentRoute);

if (process.env.API_PORT) {
  app.listen(process.env.API_PORT, () => {
    console.log("Backend running..");
  });
}

module.exports = app;
