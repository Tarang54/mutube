import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
//direct encryption is not possible - so we need help ok hookes
//we use Pre hook - just before saving the data, we can run this hook - maybe for password encryption


const userSchema = new Schema({
    username: {
        type: String,
        required : true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required : true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullName: {
        type: String,
        required : true,
        lowercase: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String,
        required: true
    },
    coverImage: {
        type: String
    },
    watchHistory:[{
        type: Schema.Types.ObjectId,
        ref: "Video"
    }],
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    refreshToken: {
        type: String
    }
},{
    timestamps: true
})

//we dont write ()=> in callback of pre as it creates problem due to access of all the parameters
//also we use next here as it is a middleware
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password,10) // this will encrypt the password
    next()
    //now here arises a problem - whenever a user will change even his coverimage, this will change the password.
    //we dont want this to happen in these changes such as avatar and coverimage
    //thats why we use if statement to check if password is changed- if yes then only it will be modified before saving
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User", userSchema)