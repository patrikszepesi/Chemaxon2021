const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const moment = require('moment');


const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      index: true,
    },

  documentsUploaded:[{ type: ObjectId, ref: "Document" }],

  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
