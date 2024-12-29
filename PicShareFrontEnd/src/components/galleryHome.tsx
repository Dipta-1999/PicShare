
import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

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
  const [selectedPicture, setSelectedPicture] = useState<Picture | null>(null); // Modal picture state

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

  }, [currentUser]);






  // Fetch user's favorite pictures
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        console.log('Fetching user favorites...');
        const response = await fetch('http://localhost:5000/api/favorite/favorites', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: currentUser || '',
          },
        });
        if (!response.ok) {
          throw new Error(`Error fetching favorites: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched favorites:', data);
        setFavorites(data.map((fav: { pictureId: string }) => fav.pictureId));
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    if (currentUser) {
      fetchFavorites();
    } else {
      console.warn('No current user found in localStorage.');
    }
  }, [currentUser]);



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




  const openModal = (picture: Picture) => {
    setSelectedPicture(picture);
  };

  const closeModal = () => {
    setSelectedPicture(null);
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
              className="object-contain h-72 object-right cursor-pointer"
              onClick={() => openModal(picture)}
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
      {/* Modal */}
      {selectedPicture && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal} // Close modal on background click
        >
          <div
            className="bg-white rounded-lg overflow-hidden shadow-lg"
            onClick={(e) => e.stopPropagation()} // Prevent modal close on content click
          >
            <img
              src={`http://localhost:5000/api${selectedPicture.url}`}
              alt={selectedPicture.title}
              className="object-contain max-w-screen h-[80vh]"
            />
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold">{selectedPicture.title}</h2>
              <p className="text-gray-500 text-sm">
                Uploaded on: {selectedPicture.date}
              </p>
              <button
                className="mt-4 px-4 py-2 border text-black rounded-lg hover:bg-slate-300"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryHome;