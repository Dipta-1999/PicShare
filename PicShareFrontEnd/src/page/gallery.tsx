import React, { useEffect, useState } from 'react';
import { fetchPictures } from '../api/api';

interface Picture {
  _id: string;
  title: string;
  url: string;
  uploadedBy: string;
  date: string;
  favorites: string[];
}

const Gallery: React.FC = () => {
  const [pictures, setPictures] = useState<Picture[]>([]);

  // Fetch pictures from the backend
  useEffect(() => {
    const fetchPictures = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/pictures/pictures', {
          method: "GET",
          headers: { "Content-Type": "application/json" },          
        });
        const data = await response.json();
        setPictures(data);

      } catch (error) {
        console.error('Error fetching pictures:', error);
      }
    };

    fetchPictures();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pictures.map((picture) => (
          <div
            key={picture._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >             
            
            <img
              src={`http://localhost:5000/api${picture.url}`}
              alt={picture.title}
              className="w-full h-48 object-cover lg:h-52 md:h-48 sm:h-full p-2"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{picture.title}</h2>
              <p className="text-gray-600 text-sm">
                Uploaded by: {picture.uploadedBy || `${picture._id}`}
              </p>
              <p className="text-gray-500 text-sm">
                Date: {new Date(picture.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
