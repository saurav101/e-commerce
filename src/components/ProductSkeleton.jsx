import Grid from "@mui/material/Grid2";
import Skeleton from "@mui/material/Skeleton";

export default function ProductSkeleton() {
  return (
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
    </>
  );
}
