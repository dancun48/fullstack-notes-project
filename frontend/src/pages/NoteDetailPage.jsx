import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react';

const NoteDetailPage = () => {
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await api.get(`/notes/${id}`);
                setNote(res.data.data);
            } catch(error) {
                console.log("Error in fetchNote.", error);
                toast.error("Fetch failed!");
            } finally {
                setLoading(false);
            }
        }
        fetchNote();
    }, [id])

    console.log({note});
    const handleDelete = async () => {
        if(!window.confirm("Delete Note?")) return;
        try {
            await api.delete(`/notes/${id}`);
            toast.success("Note deleted successfully");
            navigate("/");

        } catch (error) {
            console.log("Error in handleDelete!", error)
            toast.error("Delete failed!")
        }
    }

    const handleSave = async () => {
        if(!note.title.trim() || !note.content.trim()) {
            toast.error("Please add title and content");
            return;
        }
        setSaving(true);

        try {
            await api.put(`/notes/${id}`, note);
            toast.success("Note updated successfully");

        } catch(error) {
            console.log("Error saving note:", error);
            toast.error("Update failed!");

        } finally {
            setSaving(false);
        }
        navigate("/")
    }

    if(loading){
        return (<div className='min-h-screen bg-base-200 flex items-center justify-center'>
            <LoaderIcon className='animate-spin size-10' />
        </div>)
    }
    return (
        <div className='min-h-screen bg-base-200'>
            <div className='container mx-auto px-4 py-8'>
            <div className='max-w-2xl mx-auto'>
                <div className='flex items-center justify-between mb-6'>
                    <Link to="/" className='btn btn-ghost'>
                        <ArrowLeftIcon className='size-5' />
                        Back to Notes
                    </Link>
                    <button onClick={handleDelete} className='btn btn-error btn-outline'>
                        <Trash2Icon className='size-5' />
                        Delete Note
                    </button>
                </div>
                <div className='card bg-base-100'>
                    <div className='card-body'>
                        <div className='form-control mb-4'>
                            <label className='label'>
                                <span className='label-text'>Title</span>
                            </label>
                            <input 
                                type='text'
                                placeholder='Note Title'
                                className='input input-bordered'
                                value={note.title}
                                onChange={(e) => setNote({...note, title: e.target.value})}
                            />
                        </div>
                        <div className='form-control mb-4'>
                            <label className='label'>
                                <span className='label-text'>Content</span>
                            </label>
                            <textarea 
                                placeholder='Write your note(s) here...'
                                className='textarea textarea-bordered h-32'
                                value={note.content}
                                onChange={(e) => setNote({...note, content: e.target.value})}
                            />
                        </div>
                        <div className='card-actions justify-end'>
                            <button className='btn btn-primary' disabled={saving} onClick={handleSave}>
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default NoteDetailPage