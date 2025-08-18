import { errorHandler } from "../utils/error.js";
import Focus from "../models/focus.model.js";

// Create or Update a Setting by key
export const createFocus = async (req, res, next) => {
  try {
    const { key, title, subtitle, content, images, data } = req.body;

    // Uncomment this if you want admin-only creation
    // if (!req.body.isAdmin) {
    //   return next(errorHandler(403, "You are not allowed to create"));
    // }

    if (!key) {
      return res.status(400).json({ message: "Key is required" });
    }

    const focus = await Focus.findOneAndUpdate(
      { key },
      { key, title, subtitle, content, images, data },
      { upsert: true, new: true, runValidators: true }
    );

    res.status(200).json(focus);
  } catch (error) {
    next(error);
  }
};

// Get a Setting by key
export const getFocus = async (req, res, next) => {
  try {
    const { key } = req.params;
    const focus = await Focus.findOne({ key });

    if (!focus) {
      return res.status(404).json({ message: "Focus not found" });
    }

    res.status(200).json(focus);
  } catch (error) {
    next(error);
  }
};

// Get All focus
export const getAllfocus = async (req, res, next) => {
  try {
    const allFocus = await Focus.find();
    res.status(200).json(allFocus);
  } catch (error) {
    next(error);
  }
};
