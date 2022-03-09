const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            minlength: 3
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            unique: true
            //match
        },
        password: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
    },
    {
        timestamps: true,
    }
)

const UserModel = mongoose.model("User", userSchema)
module.exports = UserModel