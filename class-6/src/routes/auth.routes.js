const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    username,
  });

  if (isUserAlreadyExists) {
    return res.status(409).json({
      message: "Username is already in use",
    });
  }

  const user = await userModel.create({ username, password });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "user registered successfully!",
    user,
  });
});

router.get("/user", async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      message: "Unautorized token not found",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({
      _id: decoded.id,
    });

    res.status(200).json({
      message: "user data  fetched successfully!",
      user
    });

  } catch (error) {
    return res.status(401).json({
      message: "Unautorized Invalid token",
    });
  }
});


router.post('/login', async(req,res) => {
  const {username, password} = req.body

  const user = await userModel.findOne({
    username
  })

  if(!user){
    return res.status(401).json({
      message: "user account not Found"
    })
  }

  const ispasswordValid = password === user.password

  if(!ispasswordValid){
    return res.status(401).json({
      message: "Invalid Pssword"
    })
  }

  const token = jwt.sign({
    id:user._id
  }, process.env.JWT_SECRET)

  res.cookie("token", token,{
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  })

  res.status(200).json({
    message: "user logged in successfully!",
  user
  })
})


router.get('/logout', (req,res) => {
  res.clearCookie("token")

  res.status(200).json({
    message: "user logged out successfully!",
  })
})

module.exports = router;
