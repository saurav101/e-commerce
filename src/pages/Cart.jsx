import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useCart } from "../providers/CartProvider";
import { Button, Typography } from "@mui/material";
import { useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

async function createOrder(data) {
  const res = await axios.post("/api/products/order", data);
  return res.data;
}

export default function Cart() {
  const { cart, handleCartIncrement, handleCartDecrement, resetCart } =
    useCart();
  const total = useMemo(
    () => cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0),
    [cart]
  );
  const mutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (res) => {
      console.log(res);
      resetCart();
      location.replace(res.url);
    },
  });
  const handlePayment = () => {
    mutation.mutate({
      products: cart.map(({ _id, quantity }) => {
        return { _id, quantity };
      }),
    });
  };

  return (
    <>
      <Typography sx={{ mt: 2 }} variant="h4">
        {" "}
        CART ITEMS
      </Typography>
      <List>
        {cart.map((product, index) => (
          <ListItem
            key={product._id}
            secondaryAction={
              <>
                <IconButton
                  edge="end"
                  aria-label="add"
                  onClick={() => handleCartIncrement(index)}
                >
                  <AddIcon />
                </IconButton>
                <Chip sx={{ ml: 1 }} label={product.quantity} />
                <IconButton
                  edge="end"
                  aria-label="remove"
                  onClick={() => handleCartDecrement(index)}
                >
                  <RemoveCircleIcon />
                </IconButton>
              </>
            }
          >
            <ListItemAvatar>
              <Avatar src={`http://localhost:3001/${product.image}`} />
            </ListItemAvatar>
            <ListItemText
              primary={product.name}
              secondary={`$${product.price} x ${product.quantity}=$${
                product.price * product.quantity
              }`}
            />
          </ListItem>
        ))}
      </List>
      <Typography textAlign={"right"} sx={{ mr: 2 }}>
        Total is : ${total}
      </Typography>
      <Button variant="contained" onClick={handlePayment}>
        Proceed to payment
      </Button>
    </>
  );
}
