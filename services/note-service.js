import Note from "../models/note.js";

/**
 * NoteService
 * Handles business logic and database operations.
 * Communicates directly with the Note model (MongoDB).
 */
class NoteService {

  /**
   * Fetch all notes
   */
  fetchAllNotes = async () => {
    // Retrieve all notes from database
    const notes = await Note.find();

    return notes;
  };

  /**
   * Fetch a single note by ID
   */
  fetchNote = async (noteId) => {
    if (!noteId) {
      throw new Error("Note ID is required.");
    }

    // Find note by MongoDB ObjectId
    const note = await Note.findById(noteId);

    // If note not found, throw error
    if (!note) {
      throw new Error("Note does not exist.");
    }

    return note;
  };

  /**
   * Create a new note
   */
  createNote = async (data) => {
    if (!data || typeof data !== "object") {
      throw new Error("Request body is required.");
    }

    const { title, content, author, category, tags, isFavorite, isPinned } = data;

    // Validate required fields
    if (!title || !author) {
      throw new Error("Title and author are required fields.");
    }

    // Create new note instance
    const newNote = new Note({
      title: title.trim(),
      content: content ? content.trim() : "",
      author: author.trim(),
      category,
      tags,
      isFavorite: isFavorite || false,
      isPinned: isPinned || false,
    });

    // Save to database
    const savedNote = await newNote.save();

    return savedNote;
  };

  /**
   * Delete a note by ID
   */
  deleteNote = async (noteId) => {
    if (!noteId) {
      throw new Error("Note ID is required for deletion.");
    }

    const deletedNote = await Note.findByIdAndDelete(noteId);

    if (!deletedNote) {
      throw new Error("Note not found.");
    }

    return deletedNote;
  };

  /**
   * Update an existing note
   */
  updateNote = async (noteId, data) => {
    if (!noteId) {
      throw new Error("Note ID is required.");
    }

    if (!data || typeof data !== "object") {
      throw new Error("Update data is required.");
    }

    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { $set: data }, // only update provided fields
      { new: true, runValidators: true } // return updated doc & validate schema
    );

    if (!updatedNote) {
      throw new Error("Note not found.");
    }

    return updatedNote;
  };
}

export default new NoteService();