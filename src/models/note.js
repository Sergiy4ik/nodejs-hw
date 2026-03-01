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

notesSchema.index(
  { title: 'text', content: 'text' },
  {
    name: 'NotesTextIndex',
    weights: { title: 10, content: 10 },
    default_language: 'english'
  }
);

export const Note = model('Note', notesSchema);
