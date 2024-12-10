import * as React from "react";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TablePagination from "@mui/material/TablePagination";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";

const getProducts = async (page, limit) => {
  const res = await axios.get("/api/products", {
    params: {
      page,
      limit,
    },
  });
  return res.data;
};

const deleteProduct = async (id) => {
  const res = await axios.delete(`/api/products/${id}`);
  return res.data;
};
export default function DashboardProducts() {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };
  const query = useQuery({
    queryKey: ["products", rowsPerPage, page],
    queryFn: () => getProducts(page, rowsPerPage),
  });
  const mutation = useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      query.refetch();
      // queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
  return (
    <TableContainer component={Paper}>
      <IconButton
        color="primary"
        onClick={() => {
          navigate("/dashboard/products/add");
        }}
      >
        <AddIcon />
      </IconButton>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {query.data?.data?.map(({ _id, name, price, image }) => (
            <TableRow
              key={_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar src={`http://localhost:3001/${image}`} />
                  <Typography sx={{ ml: 1 }}>{name}</Typography>
                </Box>
              </TableCell>
              <TableCell align="right">{price} $</TableCell>
              <TableCell align="right">
                <IconButton
                  aria-label="delete"
                  color="error"
                  onClick={() => {
                    mutation.mutate(_id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  aria-label="edit"
                  onClick={() => {
                    navigate(`/dashboard/products/edit/${_id}`);
                  }}
                >
                  <EditIcon />
                </IconButton>
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
