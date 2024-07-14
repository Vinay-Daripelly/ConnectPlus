const express = require("express");
const user = express.Router();
const expressAsyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require('multer');
const path = require('path');
const fs = require('fs');


// Configure multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    cb(null, "./catastrophe/src/components/signin/pics");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
    storage: storage,
    fileFilter: function(req,file,callback){
        if(
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ){callback(null,true)}
        else{
            console.log('only jpg, jpeg and png file supported')
            callback(null,false)
        }
    },
    limits:{
        fileSize: 1024*1024*1
    }
  });

// Use json middleware
user.use(express.json());

user.post("/create_user", upload.single('profilePhoto'), expressAsyncHandler(async (req, res) => {
    try {
        let clg = req.app.get("clg");
        let newUserObj = req.body;

        // Check if username already exists
        let userDB = await clg.findOne({ username: newUserObj.username });
        if (userDB != null) {
            res.send({ message: "Username has already been taken" });
        } else {
            // Hash password
            let hashedPassword = await bcryptjs.hash(newUserObj.password, 10);
            newUserObj.password = hashedPassword;

            // Attach the profile photo filename
            if (req.file) {
                newUserObj.profilePhoto = req.file.filename;
            }

            // Insert newUser
            await clg.insertOne(newUserObj);
            const userId = newUserObj.username; // Get the ID of the inserted user
            res.send({ message: "New user created", userId: userId });
        }
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}));

// Create route for user login
user.post("/login", expressAsyncHandler(async (request, response) => {
    let clg = request.app.get("clg");
    // Get user credentials object from client
    let userCredObj = request.body;
    // Search for user by username
    let userDB = await clg.findOne({ username: userCredObj.username });
    // If username does not exist
    if (userDB == null) {
        response.send({ message: "Invalid user" });
    } else {
        // Compare passwords
        let status = await bcryptjs.compare(userCredObj.password, userDB.password);
        if (status == false) {
            response.send({ message: "Invalid password" });
        } else {
            // Create token
            let token = jwt.sign({ username: userDB.username }, 'abcdef', { expiresIn: 600 });
            // Send token
            response.send({ message: "Login success", payload: token, userObj: userDB });
        }
    }
}));

user.get("/get_user/:clg_name", expressAsyncHandler(async (request, response) => {
    let clg = request.app.get("clg");
    let college_name = request.params.clg_name;
    let filtered_users = await clg.find({ college: "VNR VJIET" }).toArray();
    response.send({ message: "Created user successfully",payload:filtered_users });
}));

// In alumni.js or your relevant route file

user.get("/get_userpic/:id", expressAsyncHandler(async (request, response) => {
    let clg = request.app.get("clg");
    let userId = request.params.id;
    let user = await clg.findOne({ username: userId });
    if (user) {
        response.send(user);
    } else {
        response.status(404).send({ message: "User not found" });
    }
}));

module.exports = user;
