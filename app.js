require("dotenv").config();

const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/database.js");
const cors = require("cors");

const app = express();
app.use(cors());
{
  origin: "*";
}

const userRoutes = require("./routes/user");

const chatRoutes = require("./routes/chat");

const groupRoutes = require("./routes/group");

const groupnameRoutes = require("./routes/groupname");

const User = require("./models/user");
const Chat = require("./models/chat");
const Group = require("./models/group");
const GroupMsg = require("./models/groupmsg");
const UserGroup = require("./models/usergroup");

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/user", userRoutes);

app.use("/chat", chatRoutes);

app.use("/groups", groupRoutes);

app.use("/groupnam", groupnameRoutes);

User.hasMany(Chat);
Chat.belongsTo(User);

User.hasMany(GroupMsg);
GroupMsg.belongsTo(User);

Group.hasMany(GroupMsg);
GroupMsg.belongsTo(Group);

User.belongsToMany(Group, { through: UserGroup });
Group.belongsToMany(User, { through: UserGroup });

User.belongsToMany(Group, {
  as: "Team",
  through: "GroupAdmin",
  timestamps: false,
});
Group.belongsToMany(User, {
  as: "Admin",
  through: "GroupAdmin",
  timestamps: false,
});

sequelize
  .sync()
  .then((result) => {
    // console.log(result);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
