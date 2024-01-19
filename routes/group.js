const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');

const groupController = require('../controllers/group');

router.post('/group',auth.authenticate,groupController.postgroup);

router.post('/msgsgroup',auth.authenticate,groupController.postmsgs);

router.get('/get-group',auth.authenticate,groupController.getgroup);

router.get('/get-group-msg/:groupId',auth.authenticate,groupController.getgroupmsgs)

module.exports = router;

