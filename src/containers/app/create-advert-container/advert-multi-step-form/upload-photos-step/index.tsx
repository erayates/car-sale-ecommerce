"use client";

import AdvertGallery from "@/containers/app/advert-detail-container/advert-gallery";
import React, { useState, ChangeEvent } from "react";

import { mockImages } from "@/lib/utils";

const UploadPhotosStep: React.FC = () => {
  const [files, setFiles] = useState<string[]>([]);

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList) return;

    const filesArray: string[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const reader = new FileReader();
      const file = fileList[i];

      reader.onload = (e) => {
        const image = e.target?.result;
        filesArray.push(image);

        if (filesArray.length === fileList.length) {
          setFiles(filesArray);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-12 my-4">
      <div>
        <h3 className="text-2xl">Upload Your Car Gallery:</h3>
        <div className="border-2 border-blue-200 border-dashed rounded-md p-4">
          <input type="file" multiple onChange={handleFileInputChange} />
          {files.length > 0 && (
            <div>
              <h2 className="mt-2 text-green-500">Success!</h2>
              <p className="text-green-500">{files.length} files uploaded successfully.</p>
            </div>
          )}
        </div>
      </div>
      <div>
        <h3 className="text-2xl">Preview:</h3>
        <AdvertGallery images={files} />
      </div>
    </div>
  );
};

export default UploadPhotosStep;
