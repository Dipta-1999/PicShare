// import React, { useEffect, useState } from 'react';
// import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Importing the heart icon from react-icons
// import { useLocalStorage } from 'react-use';

// interface Picture {
//   _id: string;
//   title: string;
//   url: string;
//   uploadedBy: string;
//   date: string;
//   favorites: string[];
// }

// const GalleryHome: React.FC = () => {
//   const [pictures, setPictures] = useState<Picture[]>([]);
//   const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', []); // Use local storage for favorites
//   const currentUser = localStorage.getItem('username');

//   // Fetch pictures from the backend
//   useEffect(() => {
//     const fetchPictures = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/pictures/pictures', {
//           method: 'GET',
//           headers: { 'Content-Type': 'application/json' },
//         });
//         const data = await response.json();
//         setPictures(data);
//       } catch (error) {
//         console.error('Error fetching pictures:', error);
//       }
//     };

//     fetchPictures();
//   }, []);


//   const toggleFavorite = async (pictureId: string) => {
//     try {
//       const response = await fetch('http://localhost:5000/api/pictures/favorite', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ pictureId, username: localStorage.getItem("username") }),
//       });
//       const updatedPicture = await response.json();
//       setPictures((prevPictures) =>
//         prevPictures.map((pic) => (pic._id === pictureId ? updatedPicture : pic))
//       );
//       setFavorites((prevFavorites: any) => {
//         if (updatedPicture.favorites.includes(localStorage.getItem("username"))) {
//           return [...prevFavorites, pictureId];
//         } else {
//           return prevFavorites.filter((id: string) => id !== pictureId);
//         }
//       });
//     } catch (error) {
//       console.error('Error toggling favorite:', error);
//     }
//   };


//   return (
//     <div className="container mx-auto px-4 py-8 items-center justify-center">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 items-end justify-end">
//         {pictures.map((picture) => (
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
//               {/* <div onClick={() => toggleFavorite(picture._id)}>
//                 {picture.favorites.includes(currentUser || ' ') ? (
//                   <FaHeart className="text-red-500 cursor-pointer" />
//                 ) : (
//                   <FaRegHeart className="text-gray-400 cursor-pointer" />
//                 )}
//                 </div> */}

//               {/* {favorites && favorites.includes(picture._id) ? ( // Check for undefined and use includes
//                 <FaHeart className="text-red-500 cursor-pointer" />
//               ) : (
//                 <FaRegHeart className="text-gray-400 cursor-pointer" />
//               )} */}

//               <FaHeart
//                 className={`text-gray-400 hover:text-red-500 cursor-pointer transition-colors duration-300 
//                           ${favorites && favorites.includes(picture._id) ? 'text-red-500' : ''
//                   }`} // Change color based on favorites list
//                 title="Add to Favorites"
//                 onClick={() => toggleFavorite(picture._id)}
//               />



//               {/* <FaHeart
//                 className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors duration-300"
//                 title="Add to Favorites"
//               /> */}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GalleryHome;
import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useLocalStorage } from 'react-use';

interface Picture {
  _id: string;
  title: string;
  url: string;
  uploadedBy: string;
  date: string;
  favorites: { _id: string; username: string }[];
}

const GalleryHome: React.FC = () => {
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  //const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', []);
  const currentUser = localStorage.getItem('username');

  useEffect(() => {
    // Fetch pictures from the backend
    const fetchPictures = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/pictures/pictures', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        setPictures(data);
      } catch (error) {
        console.error('Error fetching pictures:', error);
      }
    };

    fetchPictures();



    // Fetch user favorites
    // fetch('http://localhost:5000/api/favorite/favorites', {
    //   headers: { Authorization: currentUser || '' },
    // })
    //   .then(res => res.json())
    //   .then(data => setFavorites(data.map((fav: any) => fav._id)))
    //   .catch(err => console.error('Error fetching favorites:', err));
  }, [currentUser]);

  // const toggleFavorite = async (pictureId: string) => {
  //   try {
  //     const response = await fetch('http://localhost:5000/api/pictures/favorite', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ pictureId, username: localStorage.getItem("username") }),
  //     });
  //     const updatedPicture = await response.json();
  //     setPictures((prevPictures) =>
  //       prevPictures.map((pic) => (pic._id === pictureId ? updatedPicture : pic))
  //     );
  //     setFavorites((prevFavorites: any) => {
  //       if (updatedPicture.favorites.some((favoriteId: string) => favoriteId === localStorage.getItem("username"))) {
  //         return [...prevFavorites, pictureId];
  //       } else {
  //         return prevFavorites.filter((id: string) => id !== pictureId);
  //       }
  //     });
  //   } catch (error) {
  //     console.error('Error toggling favorite:', error);
  //   }
  // };


  const toggleFavorite = async (pictureId: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/favorite/favorite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: currentUser || '',
        },
        body: JSON.stringify({ pictureId }),
      });
      const message = await response.json();

      if (response.ok) {
        setFavorites(prev =>
          prev.includes(pictureId)
            ? prev.filter(id => id !== pictureId)
            : [...prev, pictureId]
        );
      } else {
        console.error('Error toggling favorite:', message.error);
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };





  return (
    <div className="container mx-auto px-4 py-8 items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 items-end justify-end">
        {pictures.map((picture) => (
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
              <button onClick={() => toggleFavorite(picture._id)}>
                {favorites.includes(picture._id) ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart className="text-gray-400" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryHome;