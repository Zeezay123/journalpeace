import Faculty from "../models/faculty.model.js";
import { errorHandler } from "../utils/error.js";

// Create Faculty
export const createFaculty = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Only admin can create a faculty"));
  }

  if (!req.body.name) {
    return next(errorHandler(400, "Faculty name is required"));
  }

  try {
    const faculty = new Faculty({ name: req.body.name });
    const savedFaculty = await faculty.save();
    res.status(201).json(savedFaculty);
  } catch (error) {
    next(error);
  }
};

// Get all faculties with departments & courses
export const getFaculty = async (req, res, next) => {
  try {
    const faculties = await Faculty.find()
      .populate({
        path: "departments",
        populate: { path: "courses" },
      })
      .exec();

    res.status(200).json(faculties);
  } catch (error) {
    next(error);
  }
};

// Update faculty
export const updateFaculty = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Only admin can update a faculty"));
  }

  try {
    const updatedFaculty = await Faculty.findByIdAndUpdate(
      req.params.facultyId,
      { $set: { name: req.body.name } },
      { new: true }
    );

    if (!updatedFaculty) {
      return next(errorHandler(404, "Faculty not found"));
    }

    res.status(200).json(updatedFaculty);
  } catch (error) {
    next(error);
  }
};

// Delete faculty
export const deleteFaculty = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Only admin can delete a faculty"));
  }

  try {
    const deleted = await Faculty.findByIdAndDelete(req.params.facultyId);
    if (!deleted) {
      return next(errorHandler(404, "Faculty not found"));
    }
    res.status(200).json({ message: "Faculty deleted successfully" });
  } catch (error) {
    next(error);
  }
};
