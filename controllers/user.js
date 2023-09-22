const User = require('../models/user');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

exports.postUser = async (req, res, next) => {
  try {

    const { name, email, phonenumber,password } = req.body;
    // console.log(name, email, password);
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      return res.status(201).json({success:false, message: "User already exists, Please Login" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      // console.log(hashPassword);
      await User.create({
        name: name,
        email: email,
        phonenumber:phonenumber,
        password: hashPassword,
      });
      return res.status(200).json({success:true, message: "Successfuly signed up" });
    }
  }
  catch (err) {
    res.status(500).json(err);
  };
}