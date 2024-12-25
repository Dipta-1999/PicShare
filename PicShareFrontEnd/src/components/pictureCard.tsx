// import { useEffect, useState } from "react";

// interface Picture {
//     _id: string;
//     title: string;
//     imagePath: string;
//     userId: { username: string };
// }

// function PictureList() {
//     const [pictures, setPictures] = useState<Picture[]>([]);

//     useEffect(() => {
//         const fetchPictures = async () => {
//             const response = await fetch("/api/pictures");
//             const data = await response.json();
//             setPictures(data);
//         };

//         fetchPictures();
//     }, []);

//     return (
//         <div>
//             <h2 className="text-xl font-semibold">Picture Gallery</h2>
//             <div className="grid grid-cols-3 gap-4 mt-4">
//                 {pictures.map((picture) => (
//                     <div key={picture._id} className="border p-4">
//                         <h3 className="font-bold">{picture.title}</h3>
//                         <img
//                             src={`/uploads/${picture.imagePath}`}
//                             alt={picture.title}
//                             className="w-full h-auto"
//                         />
//                         <p className="text-sm text-gray-500">Uploaded by: {picture.userId.username}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default PictureList;



import React from 'react';

interface PictureCardProps {
  picture: {
    _id: string;
    title: string;
    url: string;
    isFavorite: boolean;
    date: string;
  };
  onToggleFavorite: (pictureId: string) => void;
}

const PictureCard: React.FC<PictureCardProps> = ({ picture, onToggleFavorite }) => {
  return (
    <div className="border rounded shadow-md p-4">
      <img src={picture.url} alt={picture.title} className="w-full h-48 object-cover rounded" />
      <h3 className="mt-2 text-lg font-semibold">{picture.title}</h3>
      <button
        onClick={() => onToggleFavorite(picture._id)}
        className={`mt-2 px-4 py-2 text-white rounded ${picture.isFavorite ? 'bg-red-500' : 'bg-green-500'}`}
      >
        {picture.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default PictureCard;

