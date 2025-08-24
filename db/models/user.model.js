import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    birthDate: Date,
    age: Number,
    role: {
        type: String,
        default: "user",
        enum: ["admin", "user"]
    },
    isConfirmed: {
        type: Boolean,
        default: false
    }
})

export const UserModel = mongoose.model("User", userSchema);


