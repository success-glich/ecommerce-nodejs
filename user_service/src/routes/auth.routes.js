const db = require("../config/db");
const bcrypt = require('bcryptjs');
const router = require("express").Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/register',async (req,res)=>{

    const {username,email,password} = req.body;
    const  userExits = await db.query("SELECT * FROM users WHERE email=$1",[email]);

    if(userExits.rows.length){
        return res.status(400).json({message:"user already exists"});
    }
    const hashedPassword = await bcrypt.hash(password,10);

    const newUser =await db.query("INSERT INTO users (username,email,password) VALUES ($1,$2,$3) RETURNING *",
    [username,email,hashedPassword]);

    res.status(200).json({message:"user registered successfully",
        user:newUser.rows[0]
    });



});


router.post('/login',async (req,res)=>{
    
    
    const {username,password} = req.body;
  
    if(!username || !password) return res.status(400).json({message:"username and password are required"});
    
    const user = await db.query("SELECT * FROM users WHERE username=$1",[username]);

    if(!user.rows.length) return res.status(400).json({message:"user not found"});

    const validPassword = await bcrypt.compare(password,user.rows[0].password);
    
    if(!validPassword) return res.status(400).json({message:"invalid password"});

    const token = jwt.sign({userId:user.rows[0].id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});

    return res.status(200).json({message:"user login successfully",token});
});

router.get('/validate',async (req,res)=>{
    console.log('token',req.headers);
    const token = req.headers['authorization']?.split(' ')[1];
    if(!token) return res.status(401).json({message:"Unauthorized"});
    try {
        const tokenData = jwt.verify(token,process.env.JWT_SECRET);
        return res.status(200).json({message:"user validated successfully",tokenData});
    } catch (err) {
        
    }

})

module.exports = router;