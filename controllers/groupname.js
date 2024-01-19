const { Op } = require("sequelize");
const { urlencoded } = require("body-parser");
const Group = require("../models/group");
const User = require("../models/user");
const GroupMsg = require("../models/groupmsg");
exports.postgroupname = async (req, res, next) => {
  try {
    const {groupname,searchInput} = req.body;
    // const userId = req.body.id;

    console.log(groupname,searchInput);
    const gp = await Group.create({ groupname: groupname ,userId:req.user.id,name:req.user.name});
    res
      .status(201)
      .json({ massage: "group added successfully", gp, success: true });
  } catch (err) {
    console.log(err);
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
