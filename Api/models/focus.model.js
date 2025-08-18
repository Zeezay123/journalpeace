import mongoose from "mongoose";

const focusSchema = new mongoose.Schema(
  {
    key: { // Unique identifier for this setting/content
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    title: {
      type: String,
      default: ""
    },
    subtitle: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    },
    images: [
      {
        url: String,
        alt: String
      }
    ],
    data: {
      type: mongoose.Schema.Types.Mixed, // any extra dynamic fields
      default: {}
    }
  },
  { timestamps: true }
);

const Focus = mongoose.model("Focus", focusSchema);

export default  Focus;
