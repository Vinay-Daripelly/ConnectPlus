const express = require("express");
const user = express.Router();
const expressAsyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require('path');
const fs = require('fs');

// Use json middleware
user.use(express.json());

user.post("/create_user", expressAsyncHandler(async (req, res) => {
    try {
        console.log("1111")
        let clg = req.app.get("clg");
        console.log("Received request body:", req.body);
        let newUserObj = req.body;

        if (!newUserObj || !newUserObj.password) {
            console.log("Invalid request body:", newUserObj);
            return res.status(400).send({ message: "Invalid request body" });
        }

        // Check if username already exists
        let userDB = await clg.findOne({ username: newUserObj.username });
        if (userDB != null) {
            res.send({ message: "Username has already been taken" });
        } else {
            try{
            // Hash password
            let hashedPassword = await bcryptjs.hash(newUserObj.password, 10);
            newUserObj.password = hashedPassword;
            }
            catch(error){
                console.error('Error hashing password:', error);
                return res.status(500).send({ message: "Error hashing password" });
            }

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

user.get("/get_userdetails/:id", expressAsyncHandler(async (request, response) => {
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
