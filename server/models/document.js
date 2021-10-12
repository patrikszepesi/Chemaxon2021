const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      maxlength: 32,
      text: true,
    },

    user:[{ type: ObjectId, ref: "User" }],

    slug: {//slug is based off of the title
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },

    documents: {
      type: Array,
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", documentSchema);
