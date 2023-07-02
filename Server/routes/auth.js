const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send("Welcome");
});
router.get("/about", (req, res) => {
  res.send("this is about to be");
});
router.get("/contact", (req, res) => {
  res.send("Welcome");
});
router.get("/signin", (req, res) => {
  res.send("Welcome");
});
router.get("/singup", (req, res) => {
  res.send("Welcome");
});

// using promises
// router.post("/registration", (req, res) => {
//   const { name, email, phone, password, cpassword } = req.body;

//   if (!name || !email || !phone || !password || !cpassword) {
//     return res.json({ error: "Please enter the field data properly" });
//   }
//   User.findOne({ email: email })
//     .then((userExist) => {
//       if (userExist) {
//         return res.json({ error: "User already exists" });
//       }
//       const user = new User({ name, email, phone, password, cpassword });
//       user
//         .save()
//         .then(() => {
//           res.json({ message: "user registered successful" });
//         })
//         .catch((err) => {
//           res.json({ error: "failed to register" });
//         });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// using async
router.post("/registration", async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;
  try {
    if (!name || !email || !phone || !password || !cpassword) {
      return res.json({ error: "Please enter the field data properly" });
    }
    const userExist =  await User.findOne({ email: email });
    if (userExist) {
      return res.json({ error: "User already exists" });
    } else if(password != cpassword)
    {
      return res.json({ error: "Password doesnot match" }); 
    }
    const user = new User({ name, email, phone, password, cpassword });

    const userregistered = await user.save();
    if (userregistered) {
      res.json({ message: "user registered successful" });
    }
  } catch (error) {
    res.json({ error: "failed to register" });
  }
});

router.post("/signin", async (req, res) => {
  
  try{
    let token
    const { email, password}=req.body;
    
    if(!email || !password) {
      return res.json({error: "Fill up the section to continue"})
    }
    const userCheck =  await User.findOne({email: email})

    
    
    if(userCheck)
    {
    const is_match = await bcrypt.compare(password,userCheck.password);
     token = await userCheck.generateAuthToken();
    console.log(token)
    res.cookie("jwttoken",token,{expires: new Date(Date.now()+25892000000),httpOnly: true})

      if(!is_match)
      {
        return res.json({error: "Credential doesnot match"});
      }
      res.json({success:"Success"});
    }else
    {
      return res.json({error: " Usernot resgistered"});
    }
   
  }
  catch(error) {
    return res.json({error: " Usernot is resgistered"});
  }
  })
  
  module.exports = router;
  