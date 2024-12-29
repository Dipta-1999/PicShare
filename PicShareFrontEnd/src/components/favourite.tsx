import React, { useEffect, useState } from 'react';
import { Picture } from '../types';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Picture[]>([]);
  const userId = localStorage.getItem('userId');
  const currentUser = localStorage.getItem('username');
  const [selectedPicture, setSelectedPicture] = useState<Picture | null>(null); // Modal picture state
  useEffect(() => {
    fetch('http://localhost:5000/api/favorite/favorites', {
      headers: { Authorization: currentUser || '' },
    })
      .then(res => res.json())
      .then(data => setFavorites(data))
      .catch(err => console.error('Error fetching favorites:', err));
  }, [userId]);



  const openModal = (picture: Picture) => {
    setSelectedPicture(picture);
  };

  const closeModal = () => {
    setSelectedPicture(null);
  };


  return (
    <div className="container mx-auto px-4 py-8 items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 items-end justify-end">
        {favorites.map(fav => (
          <div key={fav._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 items-center justify-center"
          >
            <img
              src={`http://localhost:5000/api${fav.url}`}
              alt={fav.title}
              className="object-contain h-72 object-right cursor-pointer"
              onClick={() => openModal(fav)}
            />
            <div className="p-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold">{fav.title}</h2>
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

export default Favorites;
