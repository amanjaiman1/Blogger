import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://blogger_aman:amanjaiman12@cluster0.0selq3p.mongodb.net/blog-app')
    console.log("DB connected");
}
