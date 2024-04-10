"use client";

import { useState } from "react";

const images = [
  "/assets/images/featured-cars/clio.jpg",
  "/assets/images/featured-cars/ford-kuga.jpg",
  "/assets/images/featured-cars/bmw-320.jpg",
  "/assets/images/featured-cars/golf-8.webp",
  "https://via.placeholder.com/500x500?text=Image+5",
  "https://via.placeholder.com/500x500?text=Image+6",
  "https://via.placeholder.com/500x500?text=Image+6",

  "https://via.placeholder.com/500x500?text=Image+6",

  // Add more image URLs as needed
];

export default function ProductGallery() {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleClickThumbnail = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div className="flex flex-col gap-2 col-span-2">
      {/* Big Thumbnail */}
      <div className="relative bg-slate-200 rounded-lg h-[512px]">
        <img
          src={selectedImage}
          alt="Product"
          className="w-full h-full rounded-lg object-contain"
        />
      </div>
      {/* Thumbnails Carousel */}
      <div className="w-full max-w-full overflow-x-auto overflow-y-hidden mt-2">
        <div className="flex space-x-2">
          {images.map((image, index) => (
            <div
              key={index}
              className="w-24 h-24 rounded-lg cursor-pointer flex-shrink-0"
              onClick={() => handleClickThumbnail(image)}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-fill border-2 border-gray-200 rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
