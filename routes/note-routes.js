 import express  from "express"
 
 import{
     getNotes,getNote,createNote,updateExistingNote,deleteNote
 } from "../controllers/note-controller.js"

 const router = express.Router();

 router.get('/',getNotes);
 router.get('/:note_id',getNote);
 router.post('/',createNote);
 router.patch('/:note_id',updateExistingNote);
 router.delete('/:note_id',deleteNote);

export default router;