import bcrypt from "bcryptjs";
import userModel from "../model.js/user.model";
import jwt from "jsonwebtoken";
//
const generateToken = (userid) => {
    const accessToken = jwt.sign(
        { userid },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
    )

    return accessToken
}
//re
const generateRefreshToken = (userid) => {
    const refreshToken = jwt.sign(
        { userid },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    )

    return refreshToken
}
// auth

exports.signup = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        //validation
        if (!email || !name || !password) {
            return res.sataus(404).json("all fields are required")
        }
        //userexisring
        const userexisring = await userModel.findOne({ email });
        if (userexisring) {
            res.status(404).json("user already exists")
        }

        // create user
        const newUser = await userModel.create({ name, email, password })

        // generate tokens
        const accessToken = generateToken(newUser._id)
        const refreshToken = generateRefreshToken(newUser._id)


        res.status(201).json({
            message: "User created successfully",
            accessToken,
            refreshToken,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        })


    } catch (err) {
        console.log(err).json("server is error")
    }

}
// login function


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // check
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" })
        }
        // compare 
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" })
        }
        //  generate tokens
        const accessToken = generateAccessToken(user._id)
        const refreshToken = generateRefreshToken(user._id)
        //save
        user.refreshToken = refreshToken
        await user.save()
        //resbonse
        res.status(200).json({
            message: "Login successful",
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })



    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })

    }
}

exports.logout = async (req, res) => {
    try {

        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(400).json({ message: "Refresh token required" })
        }
        const user = await userModel.findOne({ refreshToken })
        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }
        // delet refresh from datebase
        user.refreshToken = null;
        await user.save();
        res.status(200).json({ message: "User logged out successfully" })


    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })



    }

}



