import mongoose from "mongoose";

try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("db connected");
} catch (error) {
    console.log(error);
}