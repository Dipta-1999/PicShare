// src/components/ImageUpload.tsx
import React, { useState } from 'react';
//import { uploadPicture } from '../api/api';
import { useNavigate } from 'react-router-dom';

export const UploadPicture: React.FC = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    
    formData.append('title', title);
    formData.append('picture', file);
    setUploading(true);
    try {
      console.log(formData);
      //await uploadPicture(formData);
      const response = await fetch('http://localhost:5000/api/pictures/upload', {
        method: 'POST',
        body: formData,
      });
      setTitle('');
      setFile(null);
      (document.getElementById("file-input") as HTMLInputElement).value = ""; // Clear the "Choose file" field
      // You might want to add a callback to refresh the image gallery
      console.log(response);
      if(response)
        navigate("/home")
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
      
    } 
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Upload Image</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Image title"
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <input
            type="file"
            id="file-input"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            accept="image/*"
            className="w-full"
            required
          />
        </div>
        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
};