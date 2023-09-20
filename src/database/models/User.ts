import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "This field must be required"],
    unique: [true, "This field must be unique"],
  },
  email: {
    type: String,
    required: [true, "This field must be required"],
    unique: [true, "This field must be unique"],
  },
  password: {
    type: String,
    required: [true, "This field must be required"],
    minLength: [6, "This field must have at least 6 characters"],
  },
});

const User = models.User || model("User", userSchema);

export default User;
