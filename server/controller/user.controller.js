const User = require('../model/user.model');
const secret = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
// console.log(secret);

module.exports = {
    registerUser: async (req, res) => {
        try{
            //Check if email has already been created in DB
            const checkUser = await User.findOne({email: req.body.email});
            if(checkUser) {
                res.status(400).json({message: "Email already exists"})
            }else{
                //Create account
                const newUser = await User.create(req.body);

                //Jsonwebtoken
                const userToken = jwt.sign({_id:newUser._id, email: newUser.email}, secret, {expiresIn:'30m'})
                console.log(userToken);

                res.status(201)
                .cookie('userToken', userToken, {httpOnly:true,  maxAge: 2 * 60 * 60 * 1000 })
                .json({success: 'user logged in',userToken:userToken, user: newUser})
            }
        }
        catch(err){
            console.log(err);
            res.status(400).json({error: err})
        }
    },

    login: async (req, res) => {
        //check if email exists in DB
        try {
            const user = await User.findOne({email: req.body.email});
            if(user) {
                // if user exist, check password in db with that email
                const passwordsMatch = await bcrypt.compare(req.body.password, user.password)
                if (passwordsMatch){
                    const userToken = jwt.sign({_id:user._id, email: user.email}, secret, {expiresIn:'30m'})
                    // console.log(userToken);
    
                    res.status(201)
                    .cookie('userToken', userToken, {httpOnly:true,  maxAge: 2 * 60 * 60 * 1000 })
                    .json({success: 'user logged in',userToken:userToken, user: user})
                } else {
                    res.status(400).json({message: 'Invalid Email/Password'})
                }
            } 
            else {
                res.status(400).json({message: 'Invalid Email/Password'})
            }
        }
        catch(err) {
            res.status(400).json({error:err})
        }
    },

    logout: (req, res) => {
        res.clearCookie('userToken');
        res.sendStatus(200).json({message: 'user has logged out'});
    }
}
