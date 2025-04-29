import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import methodOverride from "method-override";
import sendMail from "./helper/sendMail.js";

//models
import Admin from "./models/admin.js";
import Medicine from "./models/medicine.js";
import User from "./models/user.js";
import {
  comparePassword,
  decryptPassword,
  encryptPassword,
  sendToken,
} from "./helper/auth.js";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Medicine");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// // Create a new admin
// const createAdmin = async () => {
//     try {
//         const admin = new Admin({
//             email: 'xyz@gmail.com',
//             password: 'xyz@1090',  // Make sure to hash the password in real apps
//         });

//         const savedAdmin = await admin.save();
//         console.log('Admin saved:', savedAdmin);
//     } catch (error) {
//         console.error('Error saving admin:', error);
//     }
// };

// Call the function
// createAdmin();

//                                      ************ Signup ****************
app.post("/API/signup", async (req, res) => {
  let { name, email, password } = req.body;

  // Check if email already exists
  const existingUser = await User.findOne({ email });

  if (existingUser !== null) {
    return res.status(200).json({
      success: false,
      message: "Email already exists. Please use a different email.",
    });
  }

  // Create and Save new User into database
  try {
    const user = new User({ name, email, password });
    user.password = encryptPassword(password);
    const savedUser = await user.save();

    const dbUser = await User.findOne({ email });
    const token = sendToken(dbUser._id);

    res
      .status(200)
      .send({ success: true, message: "user saved into db", token: token });
  } catch (error) {
    res.status(200).send({ success: false, message: "Internal Server Error" });
  }
});

//                                      ************ Signin ****************
app.post("/API/signin", async (req, res) => {
  let { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user === null) {
      return res.status(200).json({
        success: false,
        message: "User not registered",
      });
    }

    const result = comparePassword(password, user.password);

    if (result) {
      const token = sendToken(user._id, email);

      res
        .status(200)
        .send({
          success: true,
          message: "User login successfully",
          token: token,
        });
    } else {
      res
        .status(200)
        .send({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(200).send({ success: false, message: "Server Error" });
  }
});

//                                      ********* Validate Admin ***********
app.post("/API/admin/check", async (req, res) => {
  try {
    let { email, password } = req.body;
    const admin = await Admin.findOne({ email, password });

    if (admin) {
      res.status(200).json({ success: true, message: "Admin not found" });
    } else {
      res.status(200).json({ success: false, message: "Admin not found" });
    }
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).send("Internal server error");
  }
});

//                                      ************ Get all ***************
app.get("/API/index", async (req, res) => {
  const allMedicine = await Medicine.find({});

  res.send(allMedicine);
});

// //Admin Data save into db
// app.post('/API/admin/save', async (req, res) => {
//   const admin = new Admin(req.body.data);
//   console.log(admin);

//   const saved = await admin.save();
//   console.log("s" + saved);
//   res.status(200).send('Admin Saved');
// });

//                                      ************ Send mail *************
app.post("/API/sendmail", async (req, res) => {
  const email = req.body.email;

  const user = await User.findOne({ email });

  if (user) {
    let name = user.name;
    const id = user._id;
    let url = `http://localhost:5173/reset-password/76b${id}76b`;

    const result = await sendMail(
      email,
      "Reset Password",
      `Hey ${name}! Your Reset Password Link is: ${url}`
    );

    return res
      .status(200)
      .send({ status: true, message: "Mail sent successfully" });
  } else {
    return res
      .status(200)
      .send({ status: false, message: "User Not Registered" });
  }
});

//                                      ********** Order Medicine **********
// ********** Order Medicine **********
app.post("/API/order-medicine", async (req, res) => {
  const { email, medicines } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    let name = user.name;
    const id = user._id;

    // Construct HTML table
    let table = `
      <h3>Medicine Order Details</h3>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
        <thead>
          <tr>
            <th>Medicine Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          ${medicines
            .map(
              (med) => `
            <tr>
              <td>${med.name}</td>
              <td>${med.quantity}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
      <p>Ordered by: <strong>${name}</strong></p>
    `;

    const result = await sendMail(
      email, // to
      "Medicine Order", // subject
      "Medicine Order Details", // text (plain text fallback)
      table // htmlContent (the HTML table)
    );

    if (result) {
      return res
        .status(200)
        .send({ status: true, message: "Mail sent successfully" });
    } else {
      return res
        .status(200)
        .send({ status: false, message: "Fail to send Mail" });
    }
  } else {
    return res
      .status(200)
      .send({ status: false, message: "User Not Registered" });
  }
});

//                                      ********** Validate User ***********
app.post("/API/validate-user", async (req, res) => {
  try {
    const { id } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send("User not valid");
    }

    res.status(200).send("User Valid");
  } catch (error) {
    res.status(201).send("Error validating user");
  }
});

//                                       ************* Get One *************
app.get("/API/admin/:id", async (req, res) => {
  let { id } = req.params;

  const medicine = await Medicine.findById(id);

  res.send(medicine);
});

//                                      ********** Reset Password **********
app.put("/API/reset-pass", async (req, res) => {
  const { id, newPassword } = req.body;

  const user = await User.findById(id);
  // user.password = encryptPassword(newPassword);
  user.password = newPassword;
  await user.save();
  res.status(200).send("Password Updated Successfully");
});

//                                      ************ Update ****************
app.put("/API/admin/:id", async (req, res) => {
  let { id } = req.params;

  let updateMedicine = await Medicine.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true }
  );

  // res.redirect(`/admin`);
  res.send(updateMedicine);
});

//                                      ************ Delete ****************
app.delete("/API/admin/:id", async (req, res) => {
  let { id } = req.params;

  let delMedicine = await Medicine.findByIdAndDelete(id);

  res.send(delMedicine);
});

//                                      ************ Create ****************
app.post("/API/admin", async (req, res) => {
  // let { id } = req.params;
  let newMedicine = new Medicine(req.body);
  const response = await newMedicine.save();
  console.log("New Medicine save into db" + response);

  res.redirect(`/admin`);
});

// //Get all medicine
// app.get("/API/index", async (req, res) => {
//   const allMedicine = Medicine.find({});
//   res.send(allMedicine);
// });

let port = 2020;

app.listen(port, () => {
  console.log("Server is running at port " + port);
});
