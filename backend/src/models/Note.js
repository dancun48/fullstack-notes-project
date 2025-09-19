import mongoose from "mongoose";

// 1- create a schema
// 2- create a model based off of the schema

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
}, { timestamps: true }); // mongodb will automatically provide createdAt and updatedAt fields

const Note = mongoose.model("Note", noteSchema);

export default Note;