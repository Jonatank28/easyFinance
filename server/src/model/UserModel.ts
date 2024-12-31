import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    photo: {
      type: String,
      default: "default.jpg",
      validate: {
        validator: function (value: string) {
          return /^(http|https):\/\/[^ "]+$/.test(value);
        },
        message: "URL inválida para foto.",
      },
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ email: 1, id: 1 }, { unique: true });

const User = mongoose.model("User", UserSchema);
export default User;
