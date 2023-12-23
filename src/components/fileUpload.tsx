import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import { setShowSnackBar } from "../redux/features/snackBar";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import ModalComponent from "./modal";
import { setModal } from "../redux/features/modal";
import { updateFile, uploadFiles } from "../redux/features/file";

interface FileUploadProps {}

const FileUpload: React.FC<FileUploadProps> = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const reUpdate = useAppSelector((state) => state.file.update);
  const file = useAppSelector((state) => state.file.file);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [fileContent, setFileContent] = useState<string | null>(null);
  console.log(reUpdate,'called')



  useEffect(() => {
  
    if (reUpdate) {
      fileInputRef?.current?.click();
    }
  }, [reUpdate]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);

    if (file && file.type === "text/plain") {
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target?.result as string;

        setFileContent(content);
        handleModalOpen();
      };
      reader.readAsText(file);
    } else {
      setFileContent(null);
      if (file) {
        dispatch(
          setShowSnackBar({
            message: "Please upload file",
            show: true,
            status: "error",
          })
        );
      } else {
        dispatch(
          setShowSnackBar({
            message: "Invalid file type",
            show: true,
            status: "error",
          })
        );
      }
    }
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      if (selectedFile.type === "text/plain") {
        if (selectedFile.size <= 10 * 1024) {
          const formData = new FormData();

          formData.append("file", selectedFile);

          if (reUpdate) {
            dispatch(updateFile(formData, file));
          } else {
            dispatch(uploadFiles(formData));
          }
          dispatch(
            setModal({
              show: false,
            })
          );

          setSelectedFile(null);
          setFileContent(null);
        } else {
          dispatch(
            setShowSnackBar({
              message:
                "File size exceeds the limit. Please upload a file smaller than 300 KB.",
              show: true,
              status: "error",
            })
          );
        }
      } else {
        dispatch(
          setShowSnackBar({
            message: "Invalid file type. Please upload a text file (txt).",
            show: true,
            status: "error",
          })
        );
      }
    } else {
      dispatch(
        setShowSnackBar({
          message: "Please select a file to upload.",
          show: true,
          status: "error",
        })
      );
    }
  };

  const handleModalOpen = () => {
    dispatch(
      setModal({
        show: true,
      })
    );
  };

  return (
    <div>
      <input
        id="contained-button-file"
        type="file"
        accept="text/plain"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <label htmlFor="contained-button-file">
        <Button ref={fileInputRef} variant="contained" component="span">
          Upload file
        </Button>
      </label>

      <ModalComponent handleClick={handleFileUpload}>
        <div>
          <h1>File Preview:</h1>
          <pre>{fileContent}</pre>
        </div>
      </ModalComponent>
    </div>
  );
};

export default FileUpload;
