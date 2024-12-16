import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Alert from "@mui/material/Alert";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const addOrUpdateProduct = async (data, productId) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("price", data.price);
  formData.append("featured", Boolean(data.featured));
  if (data.image[0]) formData.append("image", data.image[0]);

  if (productId) {
    const res = await axios.patch(`/api/products/${productId}`, formData);
    return res;
  }

  const res = await axios.post("/api/products", formData);
  return res;
};
const getProduct = async (productId) => {
  const res = await axios.get(`/api/products/${productId}`);
  return res.data.data;
};

const schema = yup
  .object({
    name: yup.string().required(),
    price: yup.number().required(),
    featured: yup.boolean(),
  })
  .required();

export default function ProductForm() {
  const [previewImg, setPreviewImg] = useState("");
  const navigate = useNavigate();
  const { productId } = useParams();
  const action = productId ? "Edit" : "Add";
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const query = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
    enabled: Boolean(productId),
  });

  useEffect(() => {
    if (query.isSuccess) {
      setValue("name", query.data.name);
      setValue("price", query.data.price);
      setValue("featured", query.data.featured);
    }
  }, [query.isSuccess]);

  const mutation = useMutation({
    mutationFn: (data) => addOrUpdateProduct(data, productId),
    onSuccess: (res) => {
      navigate("/dashboard/products");
      toast(res.data.message, {
        type: "success",
      });
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };
  return (
    <Stack
      sx={{ width: "80%", mx: "auto" }}
      direction="column"
      justifyContent="space-between"
    >
      <Card sx={{ p: 10 }} variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          {action} Product
        </Typography>
        {mutation.error && (
          <Alert sx={{ my: 2 }} severity="error">
            {mutation.error?.response?.data?.message ?? "Something went wrong"}
          </Alert>
        )}
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="image">Image</FormLabel>
            <input
              type="file"
              {...register("image")}
              onChange={(e) => {
                const url = URL.createObjectURL(e.target.files[0]);
                setPreviewImg(url);
              }}
            />
            {(previewImg || query?.data?.image) && (
              <Box
                component="img"
                src={
                  previewImg
                    ? previewImg
                    : `http://localhost:3000/${query?.data?.image}`
                }
                sx={{ width: "200px", mt: 2 }}
              />
            )}
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="name">Name</FormLabel>
            <TextField
              id="name"
              type="text"
              name="name"
              autoComplete="name"
              fullWidth
              variant="outlined"
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
              {...register("name")}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="price">Price</FormLabel>
            <TextField
              id="price"
              type="number"
              name="price"
              autoComplete="price"
              fullWidth
              variant="outlined"
              error={Boolean(errors.price)}
              helperText={errors.price?.message}
              {...register("price")}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="featured">Featured</FormLabel>
            <FormControlLabel
              control={<Checkbox {...register("featured")} />}
              label="Featured"
            />
          </FormControl>
          <Button type="submit" fullWidth variant="contained">
            {action}
          </Button>
        </Box>
      </Card>
    </Stack>
  );
}
