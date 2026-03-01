import { model, Schema } from "mongoose";
import { TAGS } from "../constants/tags.js";

const notesSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true
    },
    content: {
      type: String,
      trim: true,
      default: ""
    },
    tag: {
      type: String,
      enum: [...TAGS],
      default: "Todo"
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const Note = model('Note', notesSchema);
