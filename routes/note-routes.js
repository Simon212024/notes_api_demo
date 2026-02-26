import express from "express";
import NotesController from "../controllers/note-controller.js";

const router = express.Router();

/**
 * @route   GET /api/notes
 * @desc    Get all notes
 */
router.get("/", NotesController.getAllNotes);

/**
 * @route   GET /api/notes/:noteId
 * @desc    Get a single note by ID
 */
router.get("/:noteId", NotesController.getNote);

/**
 * @route   POST /api/notes
 * @desc    Create a new note
 */
router.post("/", NotesController.createNewNote);

/**
 * @route   PATCH /api/notes/:noteId
 * @desc    Update an existing note
 */
router.patch("/:noteId", NotesController.updateOldNote);

/**
 * @route   DELETE /api/notes/:noteId
 * @desc    Delete a note
 */
router.delete("/:noteId", NotesController.deleteOldNote);

export default router;