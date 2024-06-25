import { RequestHandler } from "express";
import Note, { NoteDocument } from "../models/note";

export interface IncomingBody {
  title: string;
  description?: string;
}

export const createSingleNote: RequestHandler = async (req, res) => {
  const newNote = await Note.create<NoteDocument>({
    title: (req.body as IncomingBody).title,
    description: (req.body as IncomingBody).description,
  });

  res.json({
    note: {
      id: newNote._id,
      title: newNote.title,
      description: newNote.description,
    },
  });
};

export const updateSingleNote: RequestHandler = async (req, res) => {
  const { noteId } = req.params;
  const { title, description } = req.body as IncomingBody;
  const note = await Note.findByIdAndUpdate(
    noteId,
    { title, description },
    { new: true }
  );
  if (!note) return res.json({ error: "Note not found!" });
  //   await note.save();
  res.json({
    note: { id: note._id, title: note.title, description: note.description },
  });
};

export const removeSingleNote: RequestHandler = async (req, res) => {
  const { noteId } = req.params;
  const removedNote = await Note.findByIdAndDelete(noteId);
  if (!removedNote) return res.json({ error: "Note could not be deleted" });
  res.json({ message: "Note deleted successfully" });
};

export const readAll: RequestHandler = async (req, res) => {
  const notes = await Note.find();
  if (!notes) return res.json({ error: "No notes in the db" });
  res.json({
    notes: notes.map((note) => {
      return {
        id: note._id,
        title: note.title,
        description: note.description,
      };
    }),
  });
};

export const getSingleNote: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const notes = await Note.findById(id);
  if (!notes) return res.json({ error: "No notes in the db" });
  res.json({ notes });
};
