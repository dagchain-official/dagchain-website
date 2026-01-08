import { Schema, models, model } from "mongoose";

export interface IUser {
  email: string;
  password: string;
  role: string;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: { 
      type: String, 
      enum: ["admin", "writer"], 
      default: "writer" 
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model<IUser>("User", UserSchema);

export default User;
