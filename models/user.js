import mongoose from "mongoose";
import Joi from "joi";

const emailregexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const userSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      match: emailregexp,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: null,
      required: [true, "Verify token is required"],
    },
  },

  { versionKey: false, timestamps: true }
);

export const registerSchema = Joi.object({
  email: Joi.string().pattern(emailregexp).required(),
  password: Joi.string().min(6).required(),
});

export const emailSchema = Joi.object({
  email: Joi.string().pattern(emailregexp).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().pattern(emailregexp).required(),
  password: Joi.string().min(6).required(),
});

const User = mongoose.model("user", userSchema);
export default User;
