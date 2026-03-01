import createHttpError from "http-errors";
import { Note } from "../models/note.js";

export const getAllNotes = async (req, res) => {
  const { page = 1, perPage = 10, search, tag } = req.query;

  const skip = (page - 1) * perPage;

  const noteQuery = Note.find();

  if (search) {
    noteQuery.where({ $text: { $search: search } });
  }

  if (tag) {
    noteQuery.where("tag", tag);
  }

  const [totalNotes, notes] = await Promise.all([
    noteQuery.clone().countDocuments(),
    noteQuery.skip(skip).limit(perPage)
  ]);

  const totalPages = Math.ceil(totalNotes / perPage);

  res.status(200).json({
    page,
    perPage,
    totalPages,
    totalNotes,
    notes,
  });
};

export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);

  if (!note) {
    throw createHttpError(404, "Note Not Found");
  }

  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const note = await Note.create(req.body);
  res.status(201).json(note);
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndDelete({
    _id: noteId
  });

  if (!note) {
    throw createHttpError(404, "Note Not Found");
  }

  res.status(200).json(note);
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndUpdate(
    { _id: noteId },
    req.body,
    { new: true }
  );

  if (!note) {
    throw createHttpError(404, "Note Not Found");
  }

  res.status(200).json(note);
};
