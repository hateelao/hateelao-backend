import { randomInt } from "crypto";
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  photoURL: {
    type: String,
    default: "https://i.ytimg.com/vi/Zr-qM5Vrd0g/maxresdefault.jpg",
  },
  firebaseId: {
    type: String,
    unique: true,
    default: "",
  },
});

module.exports = mongoose.model("user", UserSchema);

// const User = mongoose.model("user", UserSchema);
// export { User };
