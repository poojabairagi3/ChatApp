const { Op } = require('sequelize');
const Chat = require('../models/chat');
exports.postchat=async (req,res)=>{
    
  try{
    const{message}=req.body;
    await Chat.create({message:message,userId:req.user.id,name:req.user.name})
    res.status(200).json({success:true , name:req.user.name , message:message});
   
 }
 catch(err){
     console.log(err);
     res.status(500).json({success:false});
 }}

 exports.getchat=async(req,res)=>{
  try{
    const id= req.query.id || 0;
console.log("ingetchatcontrollerline18");
    console.log(id);

   const mg= await Chat.findAll({where:{id:{[Op.gt]:id}}});
    res.status(200).json({success:true ,mg });

  }
  catch(err){
    console.log(err);
  }
 };
