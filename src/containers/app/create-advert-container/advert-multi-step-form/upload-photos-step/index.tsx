"use client";

import AdvertGallery from "@/containers/app/advert-detail-container/advert-gallery";
import React, { useState, ChangeEvent } from "react";

import { mockImages } from "@/lib/utils";
import { FileInput } from "@/components/ui/file";
import { useFormContext } from "react-hook-form";

const UploadPhotosStep: React.FC = () => {
  const [files, setFiles] = useState<string[]>([]);

  const { register, getValues, setValue } = useFormContext();

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    setValue("photos", []);
    if (!fileList) return;

    const filesArray: string[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const reader = new FileReader();
      const file = fileList[i];
      setValue("photos", [file, ...getValues("photos")]);

      reader.onload = (e) => {
        const image: any = e.target?.result;
        filesArray.push(image);

        if (filesArray.length === fileList.length) {
          setFiles(filesArray);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12 my-4">
      <div className="relative h-full">
        <h3 className="text-2xl">Upload Your Car Gallery:</h3>
        <p className="text-md text-blue-500 mb-8">
          Upload photo is necessary. You will get an error if you dont add at
          least one photo.
        </p>
        <FileInput
          name="photos"
          multiple={true}
          register={register}
          onChange={handleFileInputChange}
        />
        {files.length > 0 && (
          <div>
            <h2 className="mt-2 text-green-500">Success!</h2>
            <p className="text-green-500">
              {files.length} files uploaded successfully.
            </p>
          </div>
        )}
      </div>
      <div className="mt-8">
        <h3 className="text-2xl">Preview:</h3>
        <AdvertGallery images={files.length > 0 ? files : mockImages} />
      </div>
    </div>
  );
};

export default UploadPhotosStep;
