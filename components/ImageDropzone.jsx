"use client";
import Image from "next/image";
import React, { createRef, useState } from "react";
import Dropzone from "react-dropzone";
import { toast } from "react-hot-toast";
import { MdDelete, MdModeEditOutline } from "react-icons/md";

const ImageDropzone = ({ setFieldValue, values, isEdit }) => {
  const [files, setFiles] = useState([]);
  const dropzoneRef = createRef();

  const areFilesPresent = Boolean(files.length);

  const removeFile = (file) => () => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
    setFieldValue("imgUrl", null);
  };

  const openDialog = () => {
    if (dropzoneRef.current) {
      dropzoneRef.current.open();
    }
  };

  return (
    <div className="flex flex-col w-1/2 border-solid border rounded-lg justify-center">
      <Dropzone
        ref={dropzoneRef}
        accept={{ "image/jpg": [".jpg", ".jpeg", ".png"] }}
        maxSize={5242880}
        multiple={false}
        onDrop={(acceptedFiles, fileRejections) => {
          fileRejections.forEach((file) => {
            file.errors.forEach((err) => {
              if (err.code === "file-too-large") {
                toast.error(`File size must be 5MB or smaller.`);
              }

              if (err.code === "file-invalid-type") {
                toast.error(`Files must be in jpg, jpeg or png format only.`);
              }
            });
          });
          setFieldValue("imgUrl", acceptedFiles[0]);
          setFiles(
            acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            )
          );
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            className={`${
              areFilesPresent ? "" : "border-dashed border-2"
            } p-4 cursor-pointer`}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <div className="flex justify-center items-center">
              {!values.imgUrl && !isEdit ? (
                <p>Add Picture Here</p>
              ) : (
                <>
                  {files.map((file) => (
                    <div
                      key={file.name}
                      className="w-full h-full flex flex-col justify-center items-center"
                    >
                      <img
                        style={{ objectFit: "cover" }}
                        width="120px"
                        height="120px"
                        src={file.preview}
                        alt={file.name}
                      />
                    </div>
                  ))}
                </>
              )}
              {isEdit &&
                !areFilesPresent &&
                (typeof values.imgUrl === "string" ? (
                  <div className="w-full h-full flex flex-col justify-center items-center">
                    <Image
                      style={{ objectFit: "cover" }}
                      width="120"
                      height="120"
                      src={values.imgUrl}
                      alt={values.foodSpotName || values.foodName || "photo"}
                    />
                  </div>
                ) : !values.imgUrl ? (
                  <p>Add Picture Here</p>
                ) : (
                  <>
                    {files.map((file) => (
                      <div
                        key={file.name}
                        className="w-full h-full flex flex-col justify-center items-center"
                      >
                        <img
                          style={{ objectFit: "cover" }}
                          width="120px"
                          height="120px"
                          src={file.preview}
                          alt={file.name}
                        />
                      </div>
                    ))}
                  </>
                ))}
            </div>
          </div>
        )}
      </Dropzone>
      {values.imgUrl && (
        <div className="flex w-full p-4 justify-center gap-8">
          <button
            type="button"
            onClick={openDialog}
            className="flex justify-center text-white bg-emerald-700 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            <MdModeEditOutline />
          </button>
          <button
            type="button"
            onClick={removeFile(files[0])}
            className="flex justify-center text-white bg-emerald-700 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            <MdDelete />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageDropzone;
