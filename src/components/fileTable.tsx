import { Button } from "@mui/material";
import { useAppDispatch } from "../redux/hooks";
import { deleteFile, setFileId, setUpdate } from "../redux/features/file";
import { Link } from "react-router-dom";
import { Delete } from "@mui/icons-material";

interface TableRowProps {
  originalName: string;
  id: string;
}

const TableRow = ({ originalName, id }: TableRowProps) => {
  const dispatch = useAppDispatch();

  const handleUpdate = (id: string) => {
    dispatch(setFileId(id));
    dispatch(setUpdate(Math.random()))
  };

  return (
    <div className="flex flex-row border-gray-200 px-1 md:px-4 rounded-lg py-2 border my-2  items-center">
      <div className="w-1/4">
        <span className="md:text-xl text-xs">{originalName}</span>
      </div>
      <div className="w-1/4 line-clamp-2">
        <span className="md:text-xl text-xs">{id}</span>
      </div>
      <div className="w-1/4 text-center">
        <Button onClick={() => handleUpdate(id)}>Update</Button>
        <Button
          variant="contained"
          onClick={() => {
            dispatch(deleteFile(id));
          }}
          color="error"
        >
          <Delete />
        </Button>
      </div>
      <div className="w-1/4 text-end">
        <Link to={`/file/${id}`}>
          <Button>View</Button>
        </Link>
      </div>
    </div>
  );
};

interface DataTableProps {
  rows: TableRowProps[];
}

const DataTable = ({ rows }: DataTableProps) => {
  return (
    <div className="shadow-lg p-2 md:p-5 my-10 rounded-lg">
      {rows.length > 0 ? (
        <div>
          <div className="flex flex-row border border-gray-200 px-1 md:px-4 rounded-lg py-2 items-center justify-between">
            <div className="w-1/4">
              <span className="md:text-xl text-xs">File Name</span>
            </div>
            <div className="w-1/4">
              <span className="md:text-xl text-xs">File Id</span>
            </div>
            <div className="w-1/4 text-center">
              <span className="md:text-xl text-xs">Actions</span>
            </div>
            <div className="w-1/4 text-end">
              <span className="md:text-xl text-xs">View File</span>
            </div>
          </div>
          {rows.map((row) => (
            <TableRow key={row.id} {...row} />
          ))}
        </div>
      ) : (
        <div className="p-10 flex items-center justify-center">
          <span>No Files Found Please upload one</span>
        </div>
      )}
    </div>
  );
};

export default DataTable;
