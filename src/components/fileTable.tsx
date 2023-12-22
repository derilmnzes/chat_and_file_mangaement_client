import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useAppDispatch } from "../redux/hooks";
import { deleteFile, setFileId } from "../redux/features/file";
import { Link } from "react-router-dom";

interface TableProps {
  action: React.ReactNode;
  originalName: string;
  id: string;
}

export default function DataTable({ rows }: { rows: TableProps[]}) {
  const dispatch = useAppDispatch();


  const handleUpdate = (id:string) => {
    dispatch(setFileId(id))
  }
  
  return (
   <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Id</TableCell>
            <TableCell align="left">Actions</TableCell>
            <TableCell align="left">View</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row?.originalName}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row?.originalName}
              </TableCell>
              <TableCell align="left">{row?.id}</TableCell>
              <TableCell align="left">
                <Button onClick={()=>handleUpdate(row?.id)}>Update</Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    dispatch(deleteFile(row?.id));
                  }}
                  color="error"
                >
                  Delete
                </Button>
              </TableCell>
              <TableCell align="left">
                <Link to={`/file/${row?.id}`}>
                <Button >View</Button></Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
   
    
    </>
  );
}
