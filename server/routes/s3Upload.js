const express = require("express");
const router = express.Router();


// middlewares
const { authCheck } = require("../middlewares/auth");

// controllers
const { uploadDocument } = require("../controllers/uploadToS3");


router.post("/upload/documents/", authCheck, uploadDocument);



module.exports = router;
