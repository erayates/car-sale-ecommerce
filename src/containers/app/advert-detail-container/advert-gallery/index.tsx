"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function AdvertGallery({ images = [] }: { images: [] }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  useEffect(() => {
    setSelectedImage(images[0])
  }, [images])
  
  const handleClickThumbnail = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div className="flex flex-col gap-2 col-span-3 relative">
      {/* Big Thumbnail */}
      <div className="relative bg-slate-200 rounded-lg h-[512px] overflow-hidden shadow-md">
        <div className="absolute top-[-10px] left-0 right-0 font-semibold text-slate-300 text-5xl grid grid-cols-4 ">
          {Array(50)
            .fill(null)
            .map((_, idx) => (
              <p key={idx}>carify.</p>
            ))}
        </div>
        <Image
          src={selectedImage ?? ""}
          alt="Product"
          className="w-full h-full rounded-lg object-contain z-30 relative"
          fill
        />
      </div>
      {/* Thumbnails Carousel */}
      <div className="w-full max-w-full overflow-x-auto overflow-y-hidden mt-2 relative">
        <div className="flex space-x-2 shadow-lg">
          {images.map((image, index) => (
            <div
              key={index}
              className="w-24 h-24 rounded-lg cursor-pointer flex-shrink-0 relative"
              onClick={() => handleClickThumbnail(image)}
            >
              <Image
                src={image ?? ""}
                alt={`Photo ${index + 1}`}
                fill
                className="w-full h-full object-fill border-2 border-gray-200 rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
