import mongoose from "mongoose";
import Department from "../models/depart.model.js";
import Faculty from "../models/faculty.model.js";
import { errorHandler } from "../utils/error.js";

// Create Department
export const createDepartment = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Only admin can create a department"));
  }

  const { name, faculty } = req.body;
  if (!name || !faculty) {
    return next(errorHandler(400, "Department name and faculty are required"));
  }

  try {
    let facultyId = faculty;

    // If faculty is not an ObjectId, try finding it by name
    if (!mongoose.Types.ObjectId.isValid(facultyId)) {
      const facultyDoc = await Faculty.findOne({ name: facultyId.trim() });
      if (!facultyDoc) {
        return next(errorHandler(404, "Faculty not found"));
      }
      facultyId = facultyDoc._id; // replace with the actual ObjectId
    }

    const department = new Department({ name, faculty: facultyId });
    const savedDepartment = await department.save();

    res.status(201).json(savedDepartment);
  } catch (error) {
    next(error);
  }
};

// Get all departments with courses
export const getDepartments = async (req, res, next) => {
  try {
    const departments = await Department.find()
      .populate("faculty", "name")
      .populate("courses")
      .exec();

    res.status(200).json(departments);
  } catch (error) {
    next(error);
  }
};

// Update Department
export const updateDepartment = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Only admin can update a department"));
  }

  try {
    const updatedDepartment = await Department.findByIdAndUpdate(
      req.params.departmentId,
      { $set: req.body },
      { new: true }
    );

    if (!updatedDepartment) {
      return next(errorHandler(404, "Department not found"));
    }

    res.status(200).json(updatedDepartment);
  } catch (error) {
    next(error);
  }
};

// Delete Department
export const deleteDepartment = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Only admin can delete a department"));
  }

  try {
    const deleted = await Department.findByIdAndDelete(req.params.departmentId);
    if (!deleted) {
      return next(errorHandler(404, "Department not found"));
    }
    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    next(error);
  }
};
