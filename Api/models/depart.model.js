import mongoose, { Schema } from "mongoose";
import Course from "./course.model.js";





const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      required: true,
    },
    departimage:{
      type:String,
      default:''
    },

    content:{
      type:String,
      default:''
    }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Virtual field: courses under a department
departmentSchema.virtual("courses", {
  ref: "Course",
  localField: "_id",
  foreignField: "department",
});

departmentSchema.pre("findOneAndDelete", async function (next) {
  const departmentId = this.getQuery()._id;

  await Course.deleteMany({ department: departmentId });

  next();
});

const Department = mongoose.model("Department", departmentSchema);

export default Department;
