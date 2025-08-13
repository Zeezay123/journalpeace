import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema({
  vc: {
    name: { type: String, default: "" },
    post: { type: String, default: "" },
    email: { type: String, default: "" },
    description: { type: String, default: "" },
    photo: { type: String, default: "" },
  },
  director: {
    name: { type: String, default: "" },
    post: { type: String, default: "" },
    email: { type: String, default: "" },
    description: { type: String, default: "" },
    photo: { type: String, default: "" },
  },
  deputy: {
    name: { type: String, default: "" },
    post: { type: String, default: "" },
    email: { type: String, default: "" },
    description: { type: String, default: "" },
    photo: { type: String, default: "" },
  },
  bursar: {
    name: { type: String, default: "" },
    post: { type: String, default: "" },
    email: { type: String, default: "" },
    description: { type: String, default: "" },
    photo: { type: String, default: "" },
  },
  registrar: {
    name: { type: String, default: "" },
    post: { type: String, default: "" },
    email: { type: String, default: "" },
    description: { type: String, default: "" },
    photo: { type: String, default: "" },
  },
  library: {
    name: { type: String, default: "" },
    post: { type: String, default: "" },
    email: { type: String, default: "" },
    description: { type: String, default: "" },
    photo: { type: String, default: "" },
  },
  depIct: {
    name: { type: String, default: "" },
    post: { type: String, default: "" },
    email: { type: String, default: "" },
    description: { type: String, default: "" },
    photo: { type: String, default: "" },
  },
  acad: {
    name: { type: String, default: "" },
    post: { type: String, default: "" },
    email: { type: String, default: "" },
    description: { type: String, default: "" },
    photo: { type: String, default: "" },
  }
}, { timestamps: true });

const Staff = mongoose.model("Staff", StaffSchema);

export default Staff;
