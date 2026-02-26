import NoteService from "../services/note-service.js";

/**
 * NotesController
 * Handles HTTP requests and responses.
 * Delegates business logic to the NoteService layer.
 */
class NotesController {

  /**
   * GET /api/notes
   * Fetch all notes from the database
   */
  getAllNotes = async (req, res) => {
    try {
      // Call service layer to retrieve notes
      const notes = await NoteService.fetchAllNotes();

      // Send successful response
      return res.status(200).json({
        status: "success",
        results: notes.length, // number of notes returned
        data: notes,
      });

    } catch (error) {
      // Handle unexpected server errors
      return this.handleError(res, error, "Failed to fetch notes");
    }
  };

  /**
   * GET /api/notes/:noteId
   * Fetch a single note using its ID
   */
  getNote = async (req, res) => {
    try {
      // Extract noteId from URL parameters
      const { noteId } = req.params;

      // Fetch note from service
      const note = await NoteService.fetchNote(noteId);

      // If note does not exist, return 404
      if (!note) {
        return res.status(404).json({
          status: "fail",
          message: "Note not found",
        });
      }

      // Return found note
      return res.status(200).json({
        status: "success",
        data: note,
      });

    } catch (error) {
      return this.handleError(res, error, "Failed to fetch note");
    }
  };

  /**
   * POST /api/notes
   * Create a new note
   */
  createNewNote = async (req, res) => {
    try {
      // Extract request body (JSON data sent by client)
      const noteData = req.body;

      // Create note via service layer
      const createdNote = await NoteService.createNote(noteData);

      // Return created resource with 201 status
      return res.status(201).json({
        status: "success",
        data: createdNote,
      });

    } catch (error) {
      return this.handleError(res, error, "Failed to create note");
    }
  };

  /**
   * PATCH /api/notes/:noteId
   * Update an existing note
   */
  updateOldNote = async (req, res) => {
    try {
      // Extract note ID from URL
      const { noteId } = req.params;

      // Extract fields to update from request body
      const updateData = req.body;

      // Call service to update note
      const updatedNote = await NoteService.updateNote(noteId, updateData);

      // If note not found, return 404
      if (!updatedNote) {
        return res.status(404).json({
          status: "fail",
          message: "Note not found",
        });
      }

      // Return updated note
      return res.status(200).json({
        status: "success",
        data: updatedNote,
      });

    } catch (error) {
      return this.handleError(res, error, "Failed to update note");
    }
  };

  /**
   * DELETE /api/notes/:noteId
   * Remove a note from the database
   */
  deleteOldNote = async (req, res) => {
    try {
      // Extract note ID from request parameters
      const { noteId } = req.params;

      // Attempt to delete note
      const deletedNote = await NoteService.deleteNote(noteId);

      // If note does not exist, return 404
      if (!deletedNote) {
        return res.status(404).json({
          status: "fail",
          message: "Note not found",
        });
      }

      // 204 = Successfully deleted, no content returned
      return res.status(204).json();

    } catch (error) {
      return this.handleError(res, error, "Failed to delete note");
    }
  };

  /**
   * Centralized Error Handler
   * Ensures consistent error responses across controller
   */
  handleError(res, error, defaultMessage) {
    // Log error internally for debugging
    console.error("Controller Error:", error.message);

    // Return standardized error response
    return res.status(500).json({
      status: "error",
      message: error.message || defaultMessage,
    });
  }
}

// Export a single instance of the controller
export default new NotesController();