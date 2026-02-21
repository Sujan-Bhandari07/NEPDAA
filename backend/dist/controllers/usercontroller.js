import bcrypt from "bcryptjs";
import { unlink } from "fs/promises";
import validator from "validator";
import cloudinary from "../config/cloudinary.js";
import transporter from "../config/nodemailer.js";
import User from "../models/usermodel.js";
import { gettoken } from "../utils/jwt.js";
import { err, success } from "../utils/response.js";
const registeruser = async (req, res) => {
    const { email, password, fullname, username } = req.body;
    if (!email || !password || !fullname || !username) {
        return err(res, "Pls provide all credentials");
    }
    try {
        const userexist = await User.findOne({ email });
        if (userexist?.email) {
            return err(res, "User already exist");
        }
        if (!validator.isEmail(email)) {
            return err(res, "Provide valid email");
        }
        if (!validator.isStrongPassword(password)) {
            return err(res, "Pls provide strong password");
        }
        const defaultprofilepic = "https://cdn.dribbble.com/userupload/20005517/file/original-95b85fb8ef26dc0f0e8281c78a87eff5.png?format=webp&resize=640x480&vertical=center";
        const defaultcoverpic = "https://plus.unsplash.com/premium_photo-1760645955553-d0b4d56ecbf6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=900";
        const profilepic = await cloudinary.uploader.upload(defaultprofilepic);
        const coverpic = await cloudinary.uploader.upload(defaultcoverpic);
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            password: hash,
            username,
            fullname,
            bio: `Hey I'm ${fullname},Welcome to my profile.`,
            profilepic: profilepic && profilepic.secure_url,
            coverpic: coverpic && coverpic.secure_url,
        });
        if (user) {
            const token = gettoken(user._id);
            res.cookie("token", token, {
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            const mailoption = {
                from: process.env.SENDER_EMAIL,
                to: user.email,
                subject: "Welcome to NEPDAA",
                // text: `Welcome to Blog app.Your account has been created with email Id:${user.email}`,
                html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
      <h1 style="color: #4CAF50;">Welcome to NEPDAA!</h1>
      <p style="font-size: 16px;">
        Your account has been created with email Id: 
        <strong style="color: #000;">${user.email}</strong>
      </p>
      <p style="font-size: 14px; color: #777;">
        We're excited to have you onboard. Get started by exploring our features!
      </p>`,
            };
            await transporter.sendMail(mailoption);
            const newuser = await User.findById(user._id).select("-password");
            return success(res, "Account created", newuser);
        }
    }
    catch (error) {
        return err(res, error.message);
    }
};
const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        if (!login || !password) {
            return err(res, "Provide all credentials");
        }
        const existuser = await User.findOne({ email });
        if (!existuser) {
            return err(res, "User not found");
        }
        const decoded = await bcrypt.compare(password, existuser.password);
        if (!decoded) {
            return err(res, "Password doesnot match");
        }
        const token = gettoken(existuser._id);
        if (token) {
            res.cookie("token", token, { maxAge: 7 * 24 * 60 * 60 * 1000 });
            const a = await User.findOne({ email: email }).select("-password");
            return success(res, "Login successfull", a);
        }
    }
    catch (error) {
        return err(res, error.message);
    }
};
const logout = async (req, res) => {
    return res
        .clearCookie("token")
        .status(200)
        .json({ success: true, message: "Logout successfull" });
};
const getuser = async (req, res) => {
    const _id = req.user;
    try {
        if (!_id) {
            return err(res, "User not authenticated");
        }
        const user = await User.findById(_id).select("-password");
        if (!user) {
            return err(res, "User not found");
        }
        return success(res, "User found ", user);
    }
    catch (error) {
        return err(res, error.message);
    }
};
const updateprofile = async (req, res) => {
    const _id = req.user;
    const { password, bio, fullname, username } = req.body;
    try {
        const files = req.files;
        let cover;
        let profile;
        const profilepic = files?.profilepic?.[0];
        const coverpic = files?.coverpic?.[0];
        if (!_id) {
            return err(res, "Not authenticated");
        }
        const user = await User.findById(_id);
        if (!user) {
            return err(res, "User not found");
        }
        if (coverpic) {
            cover = (await cloudinary.uploader.upload(coverpic.path)).secure_url;
            await unlink(coverpic.path);
            user.coverpic = cover;
        }
        if (profilepic) {
            profile = (await cloudinary.uploader.upload(profilepic.path)).secure_url;
            await unlink(profilepic.path);
            user.profilepic = profile;
        }
        if (username) {
            const a = await User.findOne({ username: username });
            if (a) {
                return err(res, "Provide another username");
            }
            user.username = username;
        }
        if (fullname) {
            user.fullname = fullname;
        }
        if (bio) {
            user.bio = bio;
        }
        if (password) {
            if (!validator.isStrongPassword(password)) {
                return err(res, "Provide strong password");
            }
            const hash = await bcrypt.hash(password, 10);
            user.password = hash;
        }
        await user.save();
        return success(res, "User updated successfully !");
    }
    catch (error) {
        return err(res, error.message);
    }
};
const sendverifyotp = async (req, res) => {
    const _id = req.user;
    if (!_id) {
        return err(res, "User not authenticated");
    }
    try {
        const user = await User.findById(_id);
        if (!user) {
            return err(res, "User not found");
        }
        if (user.isverified) {
            return err(res, "User already verified");
        }
        const otp = String(Math.floor(111111 + Math.random() * 999999));
        if (otp) {
            user.verifyotp = otp;
            user.verifyotpexp = Date.now() + 5 * 60 * 1000;
            await user.save();
        }
        const mailoption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Verify otp",
            // text: `Welcome to Blog app.Your account has been created with email Id:${user.email}`,
            html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
      <h1 style="color: #4CAF50;">Adda -N</h1>
      <p style="font-size: 16px;">
       Verify otp is: 
        <strong style="color: #000;">${otp}</strong>
      </p>
      <p style="font-size: 14px; color: #777;">
        Fill up the otp fast !
      </p>`,
        };
        await transporter.sendMail(mailoption);
        return success(res, "Verify otp send to email", { otp });
    }
    catch (error) {
        return err(res, error.message);
    }
};
const checkverifyotp = async (req, res) => {
    const { otp } = req.body;
    const id = req.user;
    if (!id) {
        return err(res, "User not authenticated");
    }
    if (!otp) {
        return err(res, "Pls provide otp");
    }
    try {
        const user = await User.findById(id);
        if (!user) {
            return err(res, "User not found");
        }
        if (user.verifyotp === "") {
            return err(res, "Pls try again");
        }
        if (user.verifyotpexp < Date.now()) {
            user.verifyotp = "";
            return err(res, "Verify otp already expired");
        }
        if (otp.toString() !== user.verifyotp) {
            return err(res, "Otp doesn't matched !");
        }
        user.isverified = true;
        user.verifyotp = "";
        user.verifyotpexp = 0;
        await user.save();
        return success(res, "Account verified !");
    }
    catch (error) {
        return err(res, error.message);
    }
};
const sendresetotp = async (req, res) => {
    const email = req.body.email;
    if (!email) {
        return err(res, "Pls provide email");
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return err(res, "User not found");
        }
        const otp = String(Math.floor(111111 + Math.random() * 999999));
        if (otp) {
            user.resetotp = otp;
            user.resetotpexp = Date.now() + 5 * 60 * 1000;
        }
        await user.save();
        const mailoption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Reset otp",
            // text: `Welcome to Blog app.Your account has been created with email Id:${user.email}`,
            html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
      <h1 style="color: #4CAF50;"> Adda-N</h1>
      <p style="font-size: 16px;">
        Reset otp is: 
        <strong style="color: #000;">${otp}</strong>
      </p>
      <p style="font-size: 14px; color: #777;">
        Fill up the otp fast !
      </p>`,
        };
        await transporter.sendMail(mailoption);
        return success(res, "Reset otp send at registered email", { otp });
    }
    catch (error) {
        return err(res, error.message);
    }
};
const checkresetotp = async (req, res) => {
    const { email, otp } = req.body;
    if (!otp) {
        return err(res, "Pls provide otp");
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return err(res, "User not found");
        }
        if (user.resetotp === "") {
            return err(res, "Pls try again");
        }
        if (Date.now() > user.resetotpexp) {
            return err(res, "Otp already expired");
        }
        if (user.resetotp !== otp.toString()) {
            return err(res, "Otp doesnot matched !");
        }
        user.resetotp = "";
        user.resetotpexp = 0;
        await user.save();
        return success(res, "Otp verified !");
    }
    catch (error) {
        return err(res, error.message);
    }
};
const newpassword = async (req, res) => {
    const { password, confirmpassword, email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return err(res, "User doesnot found");
        }
        if (!password || !confirmpassword) {
            return err(res, "Pls provide password");
        }
        if (password !== confirmpassword) {
            return err(res, "Password doesnot matched !");
        }
        if (!validator.isStrongPassword(password) &&
            !validator.isStrongPassword(confirmpassword)) {
            return err(res, "Pls provide striong password");
        }
        const hashpass = await bcrypt.hash(password, 10);
        user.password = hashpass;
        await user.save();
        return success(res, "Password changed successfully");
    }
    catch (error) {
        return err(res, error.message);
    }
};
const followorunfollow = async (req, res) => {
    const _id = req.user;
    const id = req.body.id;
    try {
        if (!_id) {
            return err(res, "User not authenticated");
        }
        if (!id) {
            return err(res, "Provide another user id");
        }
        const me = await User.findById(_id);
        const you = await User.findById(id);
        if (me && you) {
            if (me?.following.includes(you?._id) && you?.followers.includes(me._id)) {
                me.following.pull(you._id);
                you.followers.pull(me._id);
                await me.save();
                await you.save();
                return success(res, `Unfollowed ${you.fullname}`);
            }
            else {
                me.following.push(you._id);
                you.followers.push(me._id);
                await me.save();
                await you.save();
                return success(res, `Followed ${you.fullname}`);
            }
        }
    }
    catch (error) {
        return err(res, error.message);
    }
};
const getuserforsidebar = async (req, res) => {
    const id = req.user;
    try {
        if (!id) {
            return err(res, "Not authenticated");
        }
        const users = await User.find({ _id: { $ne: id } }).select("-password");
        if (users.length < 1) {
            return err(res, "User not found");
        }
        return success(res, "found", users);
    }
    catch (error) {
        return err(res, error.message);
    }
};
export { getuser, getuserforsidebar, login, logout, registeruser, updateprofile, sendresetotp, sendverifyotp, checkverifyotp, checkresetotp, newpassword, followorunfollow, };
//# sourceMappingURL=usercontroller.js.map