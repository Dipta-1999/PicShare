// import React, { useState } from 'react';

// interface PictureUploadFormProps {
//   onUpload: (formData: FormData) => void;
// }

// const PictureUploadForm: React.FC<PictureUploadFormProps> = ({ onUpload }) => {
//   const [title, setTitle] = useState('');
//   const [file, setFile] = useState<File | null>(null);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (title && file) {
//       const formData = new FormData();
//       formData.append('title', title);
//       formData.append('picture', file);
//       onUpload(formData);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <input
//         type="text"
//         placeholder="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="w-full border rounded px-4 py-2"
//         required
//       />
//       <input
//         type="file"
//         accept="image/*"
//         onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
//         className="w-full"
//         required
//       />
//       <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
//         Upload
//       </button>
//     </form>
//   );
// };

// export default PictureUploadForm;
import React, { useState } from 'react';
import { uploadPicture } from '../api/api';



interface PictureUploadFormProps {
  onUpload: (file: File, title: string) => void;
}

const PictureUploadForm: React.FC<PictureUploadFormProps> = ({ onUpload }) => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('url', file);
    formData.append('title', title);

    setUploading(true);
    try {
      console.log(formData)
      onUpload(file, title);
      setTitle('');
      setFile(null);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setUploading(false);
    }
    // if (file && title) {
    //   onUpload(file, title);
    //   setTitle('');
    //   setFile(null);
    //   setUploading(false);
    // }
  };


  return (


    <div className="max-w-md mx-auto mt-6 p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Upload Image</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <input
            type="text"
            placeholder="Image title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full"
            required
          />
        </div>

        <button 
          type="submit"
          disabled={uploading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400">
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>

  );
};

export default PictureUploadForm;
