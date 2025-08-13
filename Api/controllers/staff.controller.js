import Staff from "../models/directory.modal.js";
import { errorHandler } from "../utils/error.js";

// Get all staff
export const getStaff = async (req, res, next) => {
  try {
    const staffData = await Staff.findOne();
    if (!staffData) {
      return res.status(404).json({ message: "Staff data not found" });
    }
    res.status(200).json(staffData);
  } catch (error) {
    next(error);
  }
};

// Get a specific role section (e.g., /api/staff/vc)
export const getRoleSection = async (req, res, next) => {
  try {
    const roleName = req.params.section;
    const staffData = await Staff.findOne();

    if (!staffData) {
      return res.status(404).json({ message: "Staff data not found" });
    }

    console.log("Available roles:", Object.keys(staffData.toObject()));

    if (!staffData[roleName]) {
      return res.status(404).json({
        message: `Role '${roleName}' not found`,
        availableRoles: Object.keys(staffData.toObject())
      });
    }

    res.status(200).json(staffData[roleName]);
  } catch (error) {
    next(error);
  }
};

// Update all staff data (admin only)
export const updateStaff = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to update staff data"));
  }

  try {
    const staffData = await Staff.findOneAndUpdate(
      {},
      { $set: req.body },
      { new: true, upsert: true } // create if not exist
    );
    res.status(200).json(staffData);
  } catch (error) {
    next(error);
  }
};

// Update a specific role section
export const updateRoleSection = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to update staff data"));
  }

  try {
    const roleName = req.params.section;
    const updateData = { [roleName]: req.body };

    const staffData = await Staff.findOneAndUpdate(
      {},
      { $set: updateData },
      { new: true, upsert: true }
    );

    res.status(200).json(staffData[roleName]);
  } catch (error) {
    next(error);
  }
};
