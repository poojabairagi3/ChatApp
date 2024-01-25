const { Op } = require("sequelize");
const { urlencoded } = require("body-parser");
const Group = require("../models/group");
const User = require("../models/user");
const GroupMsg = require("../models/groupmsg");
exports.postgroupname = async (req, res, next) => {
  try {
    const { groupname, userList } = req.body;
    const list = new Set();
    userList.forEach((ele) => list.add(ele));
    list.add(req.user.id);
    const data = await Group.create({ groupname, createdBy: req.user.id });
    let arr = Array.from(list);
    await data.addUsers(arr);
    const addadmin = await data.addAdmin(req.user.id);
    res.json({ message: "post group controller", data });
  } catch (error) {
    console.log(error.message);
  }
};

exports.getSearchInput = async (req, res, next) => {
  try {
    const search = req.params.search;
    const searchInput = await User.findAll({
      where: { name: { [Op.like]: `%${search}%` } },
    });
    console.log(searchInput);
    res.status(201).json({ searchInput, success: true });
  } catch (err) {
    console.log(err);
  }
};
