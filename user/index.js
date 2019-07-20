'use strict';
const jwt = require('jsonwebtoken');
const userModel = require('../models/usersModel');

module.exports = (app)=>{ 
  
  // user registration
  app.post('/api/user/register', (req,res,next)=>{
    let reqData = req.body;
    if(!reqData.userid || !reqData.password){
        return res.send({'succes':false, 'msg':'Invalid data'});
    }
    let newUser = new userModel(reqData);
    newUser.save((err, user)=>{
        if(err) return res.send({'success':false, 'msg':'Error occured '+err});
        return res.send({'success':true, 'msg':'User registered successfully'});
    }); 
  });

  //user login 
  app.post('/api/user/login',(req,res,next)=>{
      let reqData = req.body;
      if(!reqData.userid || !reqData.password){
        return res.send({'succes':false, 'msg':'Invalid credentials'});
    }
    userModel.findOne({'userid':reqData.userid},(err, user)=>{
        if(err)  return res.send({'succes':false, 'msg':'Invalid credentials'});
        if(user.password !== reqData.password ) return res.send({'succes':false, 'msg':'Invalid credentials'});
        else {
            delete user['password'];
            let d = {_id:user._id, userid:user.userid};
            jwt.sign(d, 'hqwhqhwiuehiquwhei', (err, token)=>{
                if(err) return res.send({'succes':false, 'msg':'Error in loggin '+err});
                return res.send({'success':true, 'msg':'loggedin successfully', user:user, token:token});
            });
            
        }
    })
  })

}