import { Typography } from "@mui/material";
import axios from "axios";
import ProductCard from "../components/Product";
import Grid from "@mui/material/Grid2";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@mui/material/Skeleton";

const getFeaturedProducts = async () => {
  const res = await axios.get("http://localhost:3001/api/products/featured");
  return res.data?.data;
};
export default function Home() {
  const query = useQuery({
    queryKey: ["featured-products"],
    queryFn: getFeaturedProducts,
  });

  return (
    <>
      <img src="banner.jpg" width="100%" />
      <Typography variant="h4" align="center" marginY={2}>
        Featured Products
      </Typography>
      <Grid container spacing={2}>
        {query.isLoading ? (
          <>
            <Grid size={{ md: 3 }}>
              <Skeleton variant="rectangular" height={200} />
            </Grid>
            <Grid size={{ md: 3 }}>
              <Skeleton variant="rectangular" height={200} />
            </Grid>
            <Grid size={{ md: 3 }}>
              <Skeleton variant="rectangular" height={200} />
            </Grid>
            {200}
          </>
        ) : (
          query.data.map((product) => {
            return (
              <Grid key={product._id} size={{ md: 3 }}>
                <ProductCard product={product} />
              </Grid>
            );
          })
        )}
      </Grid>
      <Typography variant="h4" align="center" marginY={2}>
        Latest Products
      </Typography>
      <>
        <Grid container spacing={2}>
          {query.isLoading ? (
            <>
              <Grid size={{ md: 3 }}>
                <Skeleton variant="rectangular" height={200} />
              </Grid>
              <Grid size={{ md: 3 }}>
                <Skeleton variant="rectangular" height={200} />
              </Grid>
              <Grid size={{ md: 3 }}>
                <Skeleton variant="rectangular" height={200} />
              </Grid>
              {200}
            </>
          ) : (
            query.data.map((product) => {
              return (
                <Grid key={product._id} size={{ md: 3 }}>
                  <ProductCard product={product} />
                </Grid>
              );
            })
          )}
        </Grid>
      </>
    </>
  );
}
