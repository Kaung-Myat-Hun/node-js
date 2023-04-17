const DB = require("../dbs/post");
const Helper = require("../utils/helper");

const all = async (req, res, next) => {
  let posts = await DB.find().populate("user", "-password -__v");
  Helper.fMsg(res, "All Posts", posts);
};

const get = async (req, res, next) => {
  let post = await DB.findById(req.params.id).populate("user", "-password -__v");
  if (post) {
    Helper.fMsg(res, "Single Post", post);
  } else {
    next(new Error("Cannot Find with that post id"));
  }
};

const add = async (req, res, next) => {
  let savePost = new DB(req.body);
  let result = await savePost.save();
  Helper.fMsg(res, "Add New Post", result);
};

const patch = async (req, res, next) => {
  let post = await DB.findById(req.params.id);
  if (post) {
    await DB.findByIdAndUpdate(post._id, req.body);
    let retPost = await DB.findById(post._id);
    Helper.fMsg(res, "Post Updated", retPost);
  } else {
    next(new Error("Error no Post found with that id"));
  }
};

const drop = async (req, res, next) => {
  await DB.findByIdAndDelete(req.params.id);
  Helper.fMsg(res, "Post Delete");
};

module.exports = {
  all,
  get,
  add,
  patch,
  drop,
};
