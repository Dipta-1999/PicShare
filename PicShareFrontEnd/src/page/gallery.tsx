import React, { useEffect, useState } from 'react';
import { fetchPictures, toggleFavorite } from '../api/api';
import PictureCard from '../components/pictureCard';

const Gallery: React.FC = () => {
  const [pictures, setPictures] = useState<any[]>([]);

  useEffect(() => {
    const loadPictures = async () => {
      const data = await fetchPictures();
      setPictures(data);
    };
    loadPictures();
  }, []);

  const handleToggleFavorite = async (pictureId: string) => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      await toggleFavorite(pictureId, userId);
      setPictures((prev) =>
        prev.map((pic) =>
          pic._id === pictureId ? { ...pic, isFavorite: !pic.isFavorite } : pic
        )
      );
    }
  };

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {pictures.map((picture) => (
        <PictureCard key={picture._id} picture={picture} onToggleFavorite={handleToggleFavorite} />
      ))}
    </div>
  );
};

export default Gallery;
