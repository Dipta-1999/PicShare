 import React, { useEffect, useState } from 'react';
import { Picture } from '../types';
// import { FaHeart } from 'react-icons/fa';
// import { useLocalStorage } from 'react-use'; 

// interface Picture {
//   _id: string;
//   title: string;
//   url: string;
//   uploadedBy: string;
//   date: string;
//   favorites: string[];
// }

// const Favorites: React.FC = () => {
//   const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', []);
//   const [favoritePictures, setFavoritePictures] = useState<Picture[]>([]);

//   useEffect(() => {
//     if (favorites) { // Check if favorites is not undefined
//       const fetchFavoritePictures = async () => {
//         try {
//           const favoritePictureIds = favorites;
//           const promises = favoritePictureIds.map(async (id) => {
//             const response = await fetch(`http://localhost:5000/api/favorite/${id}`); 
//             return response.json();
//           });
//           const fetchedPictures = await Promise.all(promises);
//           setFavoritePictures(fetchedPictures);
//         } catch (error) {
//           console.error('Error fetching favorite pictures:', error);
//         }
//       };
//       fetchFavoritePictures();
//     }
//   }, [favorites]);

//   const removeFavorite = async (pictureId: string) => {
//     try {
//       const response = await fetch('http://localhost:5000/api/favorite', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ pictureId, username: 'your_username' }), 
//       });
//       const updatedPicture = await response.json();
//       setFavoritePictures((prevPictures) =>
//         prevPictures.filter((pic) => pic._id !== pictureId)
//       );
//       setFavorites((prevFavorites:any) =>
//         prevFavorites.filter((id:string) => id !== pictureId)
//       );
//     } catch (error) {
//       console.error('Error removing favorite:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 items-center justify-center">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 items-end justify-end">
//         {favoritePictures.map((picture) => (
//           <div
//             key={picture._id}
//             className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 items-center justify-center"
//           >
//             <img
//               src={`http://localhost:5000/api${picture.url}`}
//               alt={picture.title}
//               className="object-contain h-72 object-right"
//             />
//             <div className="p-4 flex justify-between items-center">
//               <div>
//                 <h2 className="text-lg font-semibold">{picture.title}</h2>
//                 <p className="text-gray-500 text-sm">
//                   Date: {new Date(picture.date).toLocaleDateString()}
//                 </p>
//               </div>
//               <FaHeart
//                 className="text-red-500 cursor-pointer transition-colors duration-300"
//                 title="Remove from Favorites"
//                 onClick={() => removeFavorite(picture._id)}
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Favorites;



const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Picture[]>([]);
  const userId = localStorage.getItem('userId');
  const currentUser = localStorage.getItem('username');
  useEffect(() => {
    fetch('http://localhost:5000/api/favorite/favorites', {
      headers: { Authorization: currentUser || '' },
    })
      .then(res => res.json())
      .then(data => setFavorites(data))
      .catch(err => console.error('Error fetching favorites:', err));
  }, [userId]);

  return (
    <div className="favorites">
      {favorites.map(fav => (
        <div key={fav._id} className="picture-card">
          <img src={`http://localhost:5000/api${fav.url}`} alt={fav.title} />
          <h3>{fav.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
