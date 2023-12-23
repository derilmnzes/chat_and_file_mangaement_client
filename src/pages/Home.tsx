import Layout from "../layout/Layout";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import FileUpload from "../components/fileUpload";
import { useEffect } from "react";
import { getFiles } from "../redux/features/file";
import DataTable from "../components/fileTable";

export default function Home() {
  const files = useAppSelector((state) => state.file.files);
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const dispatch = useAppDispatch();


  useEffect(() => {
    if (isAuth) {
      dispatch(getFiles());
    }
  }, [isAuth]);
  return (
    <Layout>
      <div className="w-[95%] md:w-[80%] md:m-auto">
        <FileUpload />

        <div className="mt-10">
          <DataTable rows={files} />
        </div>
      </div>
    </Layout>
  );
}
