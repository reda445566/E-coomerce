import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized - Invalid token",
        });
    }
};
export const adminRoute = (req, res, next) => {

    if (!req.user) {
        return res.status(401).json({
            message: "Unauthorized - Please login first"
        });
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Access denied - Admins only"
        });
    }

    next();
};

