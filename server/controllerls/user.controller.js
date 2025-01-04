import sendEmail from "../config/sendEmail.js";
import userModel from "../models/user.model.js";
// import bcrypt from "bcrypt";
import bcrypt from 'bcrypt';
import verificationEmailTemplates from "../utils/verificationEmailTemplates.js";

export async function registerUserController(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                error: true,
                success: false
            });
        }
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists",
                error: true,
                success: false
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const payload = {
            name,
            email,
            password: hashPassword
        }
        const newUser = new userModel(payload);
        const save = await newUser.save();
        // const newUser = await userModel.create(payload);

        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save._id}`;

        const verifyEmail = sendEmail({
            sendTo: email,
            subject: "Email Verification",
            html: verificationEmailTemplates({
                name,
                url: verifyEmailUrl
            })
        })
        return res.status(201).json({
            message: "User registered successfully",
            success: true,
            error: false,
            data: save
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function verifyEmailController(req, res) {
    try {
        const { code } = req.body;
        const user = await userModel.findOne({ _id: code });
        if(!user){
            return res.status(400).json({
                message: "Invalid verification code",
                error: true,
                success: false
            });
        }
        const updateUser = await userModel.updateOne({ _id: code }, { verify_email: true });
        return res.status(200).json({
            message: "Email verified successfully",
            success: true,
            error: false,
            data: updateUser
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await userModel.findById(userId);
        if (!user) throw new Error("User not found");

        const accessToken = user.generateAccessToken();
        console.log("Access Token:", accessToken);

        const refreshToken = user.generateRefreshToken();
        console.log("Refresh Token:", refreshToken);

        user.refresh_token = refreshToken;
        await user.save({ validateBeforeSave: false });
        console.log("User successfully updated with refresh token:", user);

        return { accessToken, refreshToken };
    } catch (error) {
        console.error("Error in generateAccessAndRefreshTokens:", error);
        throw new Error("Something went wrong while generating refresh and access token");
    }
};

// loginController 
export async function loginController(req, res) {
    try {
        const { email, password } = req.body;
        if (
            [ email, password].some((field) => field?.trim() === "")
        ) {
            throw new Error("All fields are required");
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials",
                error: true,
                success: false
            });
        }
        if(user.status!=='Active'){
            return res.status(400).json({
                message: "Your account is not active",
                error: true,
                success: false
            })
        }
        // if(!user.verify_email){
        //     return res.status(400).json({
        //         message: "Please verify your email",
        //         error: true,
        //         success: false
        //     })
        // }
        const isMatchPassword = await bcrypt.compare(password, user.password);
        if(!isMatchPassword){
            return res.status(400).json({
                message: "Invalid credentials",
                error: true,
                success: false
            });
        }
        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)
        const loggedInUser = await userModel.findById(user._id).select("-password -refresh_token")
        console.log("accessToken-> ",loggedInUser)
        const option = {
            httpOnly: true,
            secure: true,
            // sameSite: "none"
        }
        return res
        .status(200)
        .cookie("accessToken", accessToken, option)
        .cookie("refreshToken", refreshToken, option)
        .json(
            {
                message: "User logged in successfully",
                success: true,
                error: false,
                data: loggedInUser
            }
        )

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}