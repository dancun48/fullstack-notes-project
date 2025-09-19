import Note from "../models/Note.js"

export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({createdAt:-1}); // newest notes first
        // const notes = await Note.find();
        res.status(200).json({ success:true, data: notes});

    } catch (error) {
        console.error("Error in the getAllNotes controller", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
    
}

export const getNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ success: false, message: "Note not found!"});
        res.status(200).json({ success:true, data: note});

    } catch (error) {
        console.error("Error in the getNote controller", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
    
}

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = new Note({ title, content });
        const savedNote = await note.save();
        res.status(201).json({ success: true, message: "Note created successfully", data: savedNote })

    } catch (error) {
        console.error("Error in the createNote controller", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
        if (!updateNote) return res.status(404).json({ success: false, message: "Note not found!" });
        res.status(200).json({ success: true, message: "Note updated successfully" });

    } catch (error) {
        console.error("Error in the updateNote controller", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) return res.status(404).json({ success: false, message: "Note not found!"})
        res.status(200).json({ success: true, message: "Note deleted successfully" });

    } catch (error) {
        console.error("Error in the deleteNote controller", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}