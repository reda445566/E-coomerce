import mongoose from "mongoose";

const connectDB = async (req, res) => {

    try {
        const conn = await mongoose.connect(process.env.DB);
        console.log("mongodb is connected");





    } catch (err) {
        console.log(err);
        res.status(500)
        process.exit(1);
    }
}
//1234$$5



