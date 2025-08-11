import Course from "../models/course.model.js";
import Department from "../models/depart.model.js";
import Faculty from "../models/faculty.model.js";
import { errorHandler } from "../utils/error.js";
import mongoose from "mongoose";

// Create Course
export const createCourse = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Only admin can create a course"));
  }

  const { name, code, semester, department, faculty,  description = "",
      credits = 3 } = req.body;
  if (!name || !code || !semester || !department || !faculty) {
    return next(errorHandler(400, "Missing required fields"));
  }

  try {

    let departmentId = req.body.department
    if(!mongoose.Types.ObjectId.isValid(departmentId)){
    const deptExists = await Department.findOne({name:department.trim()});
    if (!deptExists) {
      return next(errorHandler(404, "Department not found"));
    }

    departmentId = deptExists._id

}
   let facultyId = req.body.faculty
   if(!mongoose.Types.ObjectId.isValid(facultyId)){
    const facultyExists = await Faculty.findOne({name:faculty.trim()});
    if (!facultyExists) {
      return next(errorHandler(404, "Faculty not found"));
    }

    facultyId = facultyExists._id
   }
    const course = new Course({
      name,
      code,
      semester,
      description: description || "",
      credits: credits || 3,
      department: departmentId,
      faculty: facultyId
    });


    const savedCourse = await course.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    next(error);
  }
};

// Get all courses
export const getCourse = async (req, res, next) => {
  try {
    const courses = await Course.find()
      .populate("faculty", "name")
      .populate("department", "name")
      .exec();

    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

// Update Course
export const updateCourse = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Only admin can update a course"));
  }

  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.courseId,
      { $set: req.body },
      { new: true }
    );

    if (!updatedCourse) {
      return next(errorHandler(404, "Course not found"));
    }

    res.status(200).json(updatedCourse);
  } catch (error) {
    next(error);
  }
};

// Delete Course
export const deleteCourse = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Only admin can delete a course"));
  }

  try {
    const deleted = await Course.findByIdAndDelete(req.params.courseId);
    if (!deleted) {
      return next(errorHandler(404, "Course not found"));
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    next(error);
  }
};
