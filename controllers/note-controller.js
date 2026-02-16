import { request, response } from "express";
import{
    fetchAllNotes,fetchNoteById,createNewNote,updateNote,deleteExistingNote
} from "../services/note-service.js";

export const getNotes = (request,response)=>{
    const data = fetchAllNotes();

    response.status(200).json({
        status: "Success",
        data

    });

};

export const getNote = (request,response)=>{
    const NoteId = request.params.note_id;
    const data = fetchNoteById(NoteId);
    response.status(200).json({
        status: "Success",
        data
    });
};

export const createNote = (request,response)=>{
    const data = createNewNote();
    response.status(201).json({
        status  :"Success",
        data
    });
};

export const updateExistingNote = (request,response)=>{
    const data =updateNote(request.params.note_id,request.body);
    response.status(200).json({
        status: "Success",data
    });
};

export const deleteNote = (request,response)=>{
    const data = deleteExistingNote(request.params.note_id);
    response.status(200).json({
        status:"Success",
        data
    })
}
