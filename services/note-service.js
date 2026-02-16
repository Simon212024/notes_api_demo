import {notes} from "../database/notes-database.js";

export const fetchAllNotes = ()=>{
    return notes
};

export const fetchNoteById = (id)=>{
    return notes.find(note => note.id === Number(id));

};

export const createNewNote = (data)=>{
    const newNote = {
        id: notes.length + 1,
        ...data
    };
    notes.push(newNote);
    return newNote;
};

export const updateNote = (id,data)=>{
    const note = notes.find(note=>note.id === Number(id));
    if(!note) return null;

    Object.assign(note,data);
    return note;

};

export const deleteExistingNote = (id)=>{
    const index = notes.findIndex(note=>note.id === Number(id));
    if(index==-1)return null;

    return notes.splice(index,1);

};