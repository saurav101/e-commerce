import * as React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const STATUS_TO_COLOR = {
  pending: "info",
  completed: "success",
  cancelled: "error",
};

const getOrders = async (page, limit, status) => {
  const res = await axios.get("/api/products/orders", {
    params: {
      page,
      limit,
      status,
    },
  });
  return res.data;
};
export default function Orders() {
  const [status, setStatus] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChange = (e) => setStatus(e.target.value);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };
  const query = useQuery({
    queryKey: ["orders", rowsPerPage, page, status],
    queryFn: () => getOrders(page, rowsPerPage, status),
  });

  return (
    <TableContainer component={Paper}>
      <Box sx={{ display: "flex", justifyContent: "end", my: 2 }}>
        <FormControl sx={{ width: "500px" }}>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            size="small"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            label="Status"
            onChange={handleChange}
          >
            <MenuItem value={""}>All</MenuItem>
            <MenuItem value={"completed"}>Completed</MenuItem>
            <MenuItem value={"pending"}>Pending</MenuItem>
            <MenuItem value={"cancelled"}>Cancelled</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order Id</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {query.data?.data?.map(({ _id, total, status }) => (
            <TableRow
              key={_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {_id}
              </TableCell>
              <TableCell align="right"> ${total}</TableCell>
              <TableCell align="right">
                <Chip label={status} color={STATUS_TO_COLOR[status]} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {query.isSuccess && (
        <TablePagination
          component="div"
          count={query.data.total}
          page={page - 1}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </TableContainer>
  );
}
