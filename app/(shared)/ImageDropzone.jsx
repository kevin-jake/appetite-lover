"use client";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { toast } from "react-toastify";

const ImageDropzone = ({ setFieldValue, values }) => {
  const [files, setFiles] = useState([]);

  const areFilesPresent = Boolean(files.length);

  const removeFile = (file) => () => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
    setFieldValue("imgUrl", null);
  };

  return (
    <div
      className="flex flex-col w-1/2 border-solid border rounded-lg justify-center"
      // justifySelf={areFilesPresent ? "center" : ""}
    >
      <Dropzone
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
              {!values.imgUrl ? (
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
                      <div className="flex w-full justify-between">
                        <button
                          type="button"
                          className="flex justify-center text-white bg-emerald-700 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                        >
                          <MdModeEditOutline />
                        </button>
                        <buttton
                          type="button"
                          onClick={removeFile(files[0])}
                          className="flex justify-center text-white bg-emerald-700 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                        >
                          <MdDelete />
                        </buttton>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default ImageDropzone;
