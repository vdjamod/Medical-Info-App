import express from "express";
import mongoose from "mongoose";

//models
import Admin from "./models/admin.js";
import Medicine from "./models/Medicine";

const app = express();

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Medicine");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const createMedicine = async () => {
    
}

// Create a new admin
const createAdmin = async () => {
    try {
        const admin = new Admin({
            email: 'xyz@gmail.com',
            password: 'xyz@1090',  // Make sure to hash the password in real apps
        });
        
        const savedAdmin = await admin.save();
        console.log('Admin saved:', savedAdmin);
    } catch (error) {
        console.error('Error saving admin:', error);
    }
};


// Call the function
// createAdmin();

let port = 2020;

app.listen(port, () => {
  console.log("Server is running at port " + port);
});
