
import Layout from "../layout/Layout";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import FileUpload from "../components/fileUpload";
import { useEffect } from "react";
import { getFiles } from "../redux/features/file";
import DataTable from "../components/fileTable";

export default function Home() {
  const files = useAppSelector((state) => state.file.files);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getFiles());
  }, []);
  return (
    <Layout>
      <div className="mt-20  w-[80%] m-auto">
        <FileUpload />

        <div className="mt-10">
          <DataTable  rows={files} />
        </div>
      </div>
    </Layout>
  );
}