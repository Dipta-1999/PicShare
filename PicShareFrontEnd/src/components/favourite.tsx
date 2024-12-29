// import React, { useEffect, useState } from 'react';

// interface Picture {
//   _id: string;
//   title: string;
//   url: string;
//   uploadedBy: string;
//   date: string;
//   favorites: string[];
// }

// const Favorites: React.FC = () => {
//   const [favorites, setFavorites] = useState<Picture[]>([]);
//   const currentUser = "currentUsername"; // Replace with actual logged-in username

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/pictures/pictures', {
//           method: 'GET',
//           headers: { 'Content-Type': 'application/json' },
//         });
//         const data = await response.json();
//         const userFavorites = data.filter((picture: Picture) =>
//           picture.favorites.includes(currentUser)
//         );
//         setFavorites(userFavorites);
//       } catch (error) {
//         console.error('Error fetching favorites:', error);
//       }
//     };

//     fetchFavorites();
//   }, []);

//   return (
//     <div className="container mx-auto px-4 py-8 items-center justify-center">
//       <h1 className="text-2xl font-bold mb-6">My Favorites</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
//         {favorites.map((picture) => (
//           <div key={picture._id} className="bg-white shadow-md rounded-lg overflow-hidden">
//             <img
//               src={`http://localhost:5000/api${picture.url}`}
//               alt={picture.title}
//               className="object-contain h-72"
//             />
//             <div className="p-4">
//               <h2 className="text-lg font-semibold">{picture.title}</h2>
//               <p className="text-gray-500 text-sm">
//                 Date: {new Date(picture.date).toLocaleDateString()}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Favorites;
import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { useLocalStorage } from 'react-use'; 

interface Picture {
  _id: string;
  title: string;
  url: string;
  uploadedBy: string;
  date: string;
  favorites: string[];
}

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', []);
  const [favoritePictures, setFavoritePictures] = useState<Picture[]>([]);

  useEffect(() => {
    if (favorites) { // Check if favorites is not undefined
      const fetchFavoritePictures = async () => {
        try {
          const favoritePictureIds = favorites;
          const promises = favoritePictureIds.map(async (id) => {
            const response = await fetch(`http://localhost:5000/api/pictures/${id}`); 
            return response.json();
          });
          const fetchedPictures = await Promise.all(promises);
          setFavoritePictures(fetchedPictures);
        } catch (error) {
          console.error('Error fetching favorite pictures:', error);
        }
      };
      fetchFavoritePictures();
    }
  }, [favorites]);

  const removeFavorite = async (pictureId: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/favorite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pictureId, username: 'your_username' }), 
      });
      const updatedPicture = await response.json();
      setFavoritePictures((prevPictures) =>
        prevPictures.filter((pic) => pic._id !== pictureId)
      );
      setFavorites((prevFavorites:any) =>
        prevFavorites.filter((id:string) => id !== pictureId)
      );
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 items-end justify-end">
        {favoritePictures.map((picture) => (
          <div
            key={picture._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 items-center justify-center"
          >
            <img
              src={`http://localhost:5000/api${picture.url}`}
              alt={picture.title}
              className="object-contain h-72 object-right"
            />
            <div className="p-4 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{picture.title}</h2>
                <p className="text-gray-500 text-sm">
                  Date: {new Date(picture.date).toLocaleDateString()}
                </p>
              </div>
              <FaHeart
                className="text-red-500 cursor-pointer transition-colors duration-300"
                title="Remove from Favorites"
                onClick={() => removeFavorite(picture._id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;