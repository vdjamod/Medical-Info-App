import Admin from "../models/admin.js";
import Pharmacist from "../models/pharmacist.js";
import { sendToken, comparePassword, encryptPassword } from "../helper/auth.js";
import { sendMail } from "../helper/sendMail.js";

export const signin = async (req, res) => {
  let { email, password } = req.body;

  try {
    const user = await Admin.findOne({ email });
    if (user === null) {
      return res.status(200).json({
        success: false,
        message: "Invalid Username and Password",
      });
    }

    const result = comparePassword(password, user.password);

    if (result) {
      const token = sendToken(user._id, email, "admin");

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(200).send({
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
};

export const addPharmacist = async (req, res) => {
  const { email, password, startTime, endTime } = req.body;
  const newPharmacist = new Pharmacist(req.body);
  newPharmacist.availableTime.start = startTime;
  newPharmacist.availableTime.end = endTime;
  newPharmacist.password = encryptPassword(password);
  await newPharmacist.save();

  if (!newPharmacist) {
    res.send({ success: false, message: "Failed to add pharmacist" });
  }

  const url = "http://localhost:5173/pharmacist/signin";

  const text = `
  <h3>Credential to Sign In</h3>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Password:</strong> ${password}</p>
  <p><strong>Login URL:</strong> <a href="${url}">${url}</a></p>
`;

  const result = await sendMail(email, "Credential to signin", "", text);

  if (result) {
    res.send({ success: true, message: "Pharmacist added successfully !!!" });
  } else {
    res.send({ success: false, message: "Failed to send mail to pharmacist" });
  }
};
