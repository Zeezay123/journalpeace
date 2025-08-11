import mongoose from "mongoose";
import Department from "./depart.model.js";
import Course from "./course.model.js";

const facultySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Virtual field: departments under a faculty
facultySchema.virtual("departments", {
  ref: "Department",
  localField: "_id",
  foreignField: "faculty",
});

// Cascade delete departments & courses when faculty is deleted
facultySchema.pre("findOneAndDelete", async function (next) {
  const facultyId = this.getQuery()._id;

  // Delete departments under this faculty
  await Department.deleteMany({ faculty: facultyId });

  // Delete courses under this faculty
  await Course.deleteMany({ faculty: facultyId });

  next();
});

const Faculty = mongoose.model("Faculty", facultySchema);

export default Faculty;
