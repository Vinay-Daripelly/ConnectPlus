const exp = require("express");
const app = exp();
const cors = require('cors');

// Allow requests from all origins
app.use(cors());
// Middleware to parse JSON bodies
app.use(exp.json());

const path = require('path');

// Serve static files from React build
app.use(exp.static(path.join(__dirname, './catastrophe/build')));

// Serve images from the uploads directory
app.use('/pics', exp.static('./catastrophe/src/components/signin/pics'));

// Connect to MongoDB
const mclient = require("mongodb").MongoClient;
const DBurl = "mongodb+srv://basic:basic@cluster0.ab3e0ng.mongodb.net/";

mclient.connect(DBurl)
  .then((client) => {
    console.log("DB connection success");
    // Create collection objects
    let dbObj = client.db("alumni");
    let clg = dbObj.collection("VNR VJIET");
    app.set("clg", clg);
    // Create collection objects for the student database
    let studentDbObj = client.db("Students");
    let studentCollection = studentDbObj.collection("VNR VJIET");
    app.set("studentCollection", studentCollection);
  })
  .catch(err => console.log("Error in DB connection ", err));

// Link alumni API
const alumni = require('./API/alumni');
app.use('/alumni', alumni);

//Link to students API
const student=require('./API/students');
app.use('/students',student);

// Handle page refresh
app.use('*', (request, response) => {
  response.sendFile(path.join(__dirname, './catastrophe/build/index.html'));
});

// Error handling middleware
app.use((error, request, response, next) => {
  response.status(500).send({ message: `${error.message}`, reason: `${error.message}` });
});

// Set port number
const PORT =  4000;
app.listen(PORT, () => console.log(`Server is running successfully on port number ${PORT}`));
