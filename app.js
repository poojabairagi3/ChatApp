const path =require('path');

const express=require("express"); 
const bodyParser=require("body-parser");

const sequelize=require("./util/database.js");
const cors=require("cors");

const app=express();
app.use(cors());
{
  origin:"*"
}
const userRoutes=require("./routes/user");

const chatRoutes=require("./routes/chat");

const User = require('./models/user');
const Chat = require('./models/chat');

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));


app.use("/user", userRoutes);

app.use("/chat",chatRoutes);

User.hasMany(Chat);
Chat.belongsTo(User);

sequelize
.sync()
.then((result)=>{
  console.log(result);
  app.listen(3000);
})
.catch((err)=>{
  console.log(err);
})