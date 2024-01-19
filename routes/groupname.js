const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const groupController = require("../controllers/groupname");

router.get("/:search",auth.authenticate,groupController.getSearchInput);

router.post("/postgroupname", auth.authenticate, groupController.postgroupname);

// router.get("/post-search-input", auth.authenticate, groupController.getSearchInput);

// router.get("/get-group", auth.authenticate, groupController.getgroup);

// router.get(
//   "/get-group-msg/:groupId",
//   auth.authenticate,
//   groupController.getgroupmsgs
// );

module.exports = router;
