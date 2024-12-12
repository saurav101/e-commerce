import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useCart } from "../providers/CartProvider";

export default function ProductCard({ product }) {
  const { handleAddToCart } = useCart();
  return (
    <Card>
      <CardMedia
        sx={{ height: 300 }}
        image={`http://localhost:3001/${product.image}`}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h3" component="div">
          {product.name}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          ${product.price}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Classy!!!
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          onClick={() => handleAddToCart(product)}
        >
          Add to Cart
        </Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
