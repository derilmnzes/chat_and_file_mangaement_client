import  { useState, useEffect } from "react";
import axiosInstance from "../config/axios";
import { handleAxiosError } from "../helper/axiosErrorHandler";
import { useAppDispatch } from "../redux/hooks";
import { setShowSnackBar } from "../redux/features/snackBar";
import { useParams } from "react-router-dom"; // Import the useParams hook
import Layout from "../layout/Layout";

const TextFileRenderer = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams(); // Extract id from URL params
  const [fileContent, setFileContent] = useState("");

  useEffect(() => {
    const fetchTextFile = async () => {
      try {
        const response = await axiosInstance(`/file/${id}`);

        const text = await response.data;
        setFileContent(text);
      } catch (error) {
        const err = handleAxiosError(error);
        dispatch(
          setShowSnackBar({
            show: true,
            message: err?.message || "",
            status: "error",
          })
        );
      }
    };

    fetchTextFile();
  }, [id, dispatch]); // Include id as a dependency

  return (
   <Layout>
     <div className="mt-20 ml-20">
      <h1>Text File Content:</h1>
      <pre>{fileContent}</pre>
    </div>
   </Layout>
  );
};

export default TextFileRenderer;
