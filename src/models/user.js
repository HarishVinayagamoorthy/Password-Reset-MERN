import mongoose from "./index.js";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: [true, "First Name is Required"],
      trim: true,
    },

    lastName: {
      type: String,
      require: [true, "Last Name is Required"],
      trim: true,
    },

    role: {
      type: String,
      default: "user",
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    datecreated: Date,
    dateUpdated: Date,
  },

  {
    collection: "users",
    versionKey: false,
    timestamps: true,
  }
);
const userModel = mongoose.model("users", userSchema);
export default userModel;
