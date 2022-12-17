const {Router} = require('express');
const { UserModel } = require('../Models/auth.model');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const userRouter=Router();

userRouter.get("/",(req,res)=>{
    res.send("UserRouter");
})

userRouter.post("/signup",async(req,res)=>{
    const {email,password} = req.body;
 
    const user_email_exist = await  UserModel.findOne({email});

    if(user_email_exist){
        res.send("user already exist, please try to login");
    }else{
        bcrypt.hash(password, 3, async function(err, hash) {
            if(err){
                res.send({"msg":"Something went wrong"})
            }
            const new_user = new UserModel({
                email,
                password:hash
            })
            try {
                await new_user.save();
                res.send({"msg":"Signup successfull"})
            } catch (error) {
                res.send({"msg":"Something went wrong"})
            }
        });

    }

})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    const user = await  UserModel.findOne({email});
    const hashed_pass=user.password
    const user_id = user._id;
    bcrypt.compare(password, hashed_pass, async function(err, result) {
       if(err){
        res.send({"msg":"Something went wrong"})
       }
      else if(result){
        var token = jwt.sign({ user_id }, process.env.SECRETE_KEY);
        res.send({"msg":"Login successfull",token})
      }else{
        res.send({"msg":"Login Failed"})
      }
    });
   
})


module.exports={
    userRouter
}