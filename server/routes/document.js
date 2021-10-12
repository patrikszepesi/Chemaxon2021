const express = require("express");
const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");

// controller
const {
  create,
  remove,
  getMyDocuments,
} = require("../controllers/document");

// routes
router.post("/document-user", authCheck, create);
router.get("/my-documents/:user",getMyDocuments);
router.delete("/document/:slug", authCheck, remove);



module.exports = router;
