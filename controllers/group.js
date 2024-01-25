const { urlencoded } = require("body-parser");
const Group = require("../models/group");
const User = require("../models/user");
const GroupMsg = require("../models/groupmsg");
exports.postgroup = async (req, res, next) => {
  try {
    const groupName = req.body.groupName;
    const name = req.body.name;
    console.log("A");
    console.log(groupName, name);
    const userId = req.user.id;
    console.log(userId);
    const gp = await Group.create({ groupname: groupName, name: name });
    const groupId = gp.id;
    console.log(groupId);
    const user = await User.findOne({ where: { id: userId } });
    const group = await Group.findOne({ where: { id: groupId } });
    // await user.addGroup(Group)
    console.log(user);
    console.log(group);
    res
      .status(201)
      .json({ massage: "group added successfully", gp, success: true });
  } catch (err) {
    console.log(err);
  }
};
exports.postmsgs = async (req, res, next) => {
  try {
    const groupmessage = req.body;
    groupmessage.userId = req.user.id;
    console.log(groupmessage);
    const gm = await GroupMsg.create(groupmessage);
    console.log(gm);
    res
      .status(201)
      .json({ massage: "msg send successfully", gm, success: true });
  } catch (err) {
    console.log(err);
  }
};

exports.getgroup = async (req, res, next) => {
  try {
    const getGroups = await Group.findAll();
    res
      .status(200)
      .json({ massage: "groups get successfully", getGroups, success: true });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error });
  }
};
exports.getgroupmsgs = async (req, res, next) => {
  try {
    const groupId = req.params.groupId;
    console.log("GroupId");
    console.log(groupId);
    const groupmsg = await GroupMsg.findAll({ where: { groupId } });
    res
      .status(200)
      .json({ message: "groupmsg get successfully", groupmsg, success: true });
  } catch (err) {
    console.log(err);
  }
};
