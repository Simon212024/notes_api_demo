import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: [100,"Title cannot exceed 100 characters!!"],
        minlength: [3,"Atleast 3 characters!!"],

    },
    content: {
        type: String,
        required: false,
        default: ""
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["work","Personal","Study"],
        default: "Personal"
    },
    tags: {
        type: [String],
        default: []
    },
    is_favorite: {
        type: Boolean,
        default: false
    },
    is_pinned: {
        type: Boolean,
        default: false
    },
    
},{timestamps: true});

const Note = mongoose.model("Note",noteSchema)

export default Note;