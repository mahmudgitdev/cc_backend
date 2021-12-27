require('../config/db');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//import model 
const User = require('../models/User');
// const passport = require('passport');
// require('./oauth');
const route = express.Router();
const {registerValidation} = require('../config/validation');
// route.get('/',(req,res)=>{
//     res.send('<a href="/auth/google">google</a>');
// })

// route.get('/auth/google',
//     passport.authenticate('google',{scope:['email','profile']})
// )



route.post('/auth/user/register', async (req,res)=>{
   
    const {error} = registerValidation(req.body);
    
    if(!error){
        const isExistEmail = await User.findOne({email:req.body.email});
            if(!isExistEmail){
                //hashing password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.password,salt);

                const user = new User({
                    email: req.body.email,
                    password: hashedPassword
                });
                try{
                    await user.save();
                    const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET);
                    res.status(200).json({
                        token: token
                    })
                }catch(err){
                    res.status(200).json({
                        error: err
                    });
                }
            }else{
                res.status(200).json({
                    error:"This email already taken!"
                });
            }
    }else{
        return res.status(200).json({
            error: error.details[0].message
        });
    }

});


route.post('/auth/user/login', async (req,res)=>{
   
    const user = await User.findOne({email:req.body.email});

    if(user){
        const validPass = await bcrypt.compare(req.body.password,user.password);
        if(validPass){
            const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET);
            res.header('auth-token',token).json({
                token: token
            });
        }else{
            res.status(200).json({
                error: "Email or Password Invalid!"
            });
        }
        
    }else{
        res.status(200).json({
            error: "Email or Password Invalid!"
        });
    }

});



module.exports = route;