import users from "../models/user.js";
import Auth from "../common/auth.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Singup
const create = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).send({ message: "fill the required field" });
    }
    let user = await users.findOne({ email: req.body.email });

    if (!user) {
      req.body.password = await Auth.hashPassword(req.body.password);
      await users.create(req.body);
      res.status(201).send({
        message: "user Create Sucessfully",
      });
    } else {
      res.status(400).send({
        message: `User with ${req.body.email} already extist`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server error",
      error: error.message,
    });
  }
};

// Singin

const login = async (req, res) => {
  try {
    let user = await users.findOne({ email: req.body.email });
    if (user) {
      let hashCompare = await Auth.hashCompare(
        req.body.password,
        user.password
      );

      if (hashCompare) {
        let token = await Auth.createToken({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        });

        let userData = await users.findOne(
          { email: req.body.email },
          { _id: 0, password: 0, status: 0, createdAt: 0, email: 0 }
        );
        res.status(200).send({
          message: "login Successfull",
          token,
          userData,
        });
      } else {
        res.status(400).send({
          message: `Invaild Passsword`,
        });
      }
    } else {
      res.status(400).send({
        message: `Account with ${req.body.email} does not exists!`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: `Internal Server Error `,
      error: error.message,
    });
  }
};

// resetpassword

const resetpassword = async (req, res) => {
  const { email } = req.body;
  try {
    let user = await users.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "user not found" });
    }

    // const token = Math.random().toString(36).slice(-8);
    const generateOTP = () => {
      const characters = "0123456789";
      return Array.from(
        { length: 6 },
        () => characters[Math.floor(Math.random() * characters.length)]
      ).join("");
    };
    const token = generateOTP();
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 300000; //5 minutes

    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user:  process.env.USER_MAILER,
        pass: process.env.PASS_MAILER,
      },
    });
    const resetUrl = `${`https://forgotpassword-reset.netlify.app/resetpassword`}`;

    const message = {
      from: "harishvinayagamoorthi@gmail.com",
      to: user.email,
      subject: "Password Reset Request",
      html: `<p>Dear ${user.firstName} ${user.lastName},</p>
      <p>You are receiving this email because you (or someone else) has requested a password reset for your account.</p>
      <p>Please use the following OTP to reset your password: <strong>${token}</strong></p>
      <p>If you did not request a password reset, please ignore this email.</p>
      <p>Please click the following link to reset your password: <a href="${resetUrl}">${resetUrl}</a></p>`,
    };
    

    transporter.sendMail(message, function (error, info) {
      if (error) {
        res.status(404).json({ message: "Something Went Wrong, try Again!" });
      } else {
        res
          .status(200)
          .json({ message: " Password Reset Email sent: " + info.response });
      }
    });
  } catch (error) {
    res.status(500).send({
      message: `Internal Server Error `,
      error: error.message,
    });
  }
};

// Token Verfication
// Token Verification and Password Reset
const passwordtoken = async (req, res) => {
  try {
    const { token } = req.body;
    const { password } = req.body;

    console.log("Received token:", token);

    const user = await users.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    console.log("Found user:", user);

    if (!user) {
      return res.status(404).json({ message: "Invalid OTP" });
    }

    if (user.resetPasswordExpires < Date.now()) {
      return res.status(401).json({ message: "OTP Expires" });
    } else {
      console.log("Resetting password for user:", user.email);
      user.password = await Auth.hashPassword(password);
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      await user.save();

      res.json({ message: "Password reset successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export default {
  create,
  login,
  resetpassword,
  passwordtoken,
};
