const Document = require("../models/document");
const User = require("../models/user");
const slugify = require("slugify");
const HttpError = require('../models/http-error');


exports.create = async (req, res) => {
  try {

    let user = await User.findById(req.body.user._id);

    req.body.slug = slugify(req.body.title);
    const newDocument = await new Document(req.body).populate("user").save();
    User.updateOne({_id: req.body.user._id}, { $push: {documentsUploaded: newDocument}}, function(){});
    res.json(newDocument);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Document.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Document delete failed");
  }
};



exports.getMyDocuments = async (req, res) => {
  const{user}=req.params

  let documents = await Document.find({user:user})
  .exec();
  res.json(documents);
};
