import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Products from "./pages/Products";
import DashboardProducts from "./pages/dashboard/DashboardProducts";
import ProductForm from "./pages/dashboard/ProductForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardLayout from "./layouts/DashboardLayout";
import { HomeLayout } from "./layouts/HomeLayout";
import {
  AdminRoutes,
  GuestRoutes,
  ProtectedRoutes,
} from "./layouts/RoutesLayout";
import AuthProvider from "./providers/AuthProvider";
import Cart from "./pages/Cart";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route element={<HomeLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route element={<ProtectedRoutes />}>
                  <Route path="/orders" element={<h2>Orders Page</h2>} />
                  <Route path="/profile" element={<h2>Profile Page</h2>} />
                </Route>
              </Route>
              <Route element={<AdminRoutes />}>
                <Route path="dashboard" element={<DashboardLayout />}>
                  <Route index element={<h2>Welcome to dashboard</h2>} />
                  <Route path="products" element={<DashboardProducts />} />
                  <Route path="products/add" element={<ProductForm />} />
                  <Route
                    path="products/edit/:productId"
                    element={<ProductForm />}
                  />
                  <Route path="users" element={<h2>users list</h2>} />
                  <Route path="orders" element={<h2>orders list</h2>} />
                </Route>
              </Route>

              <Route element={<GuestRoutes />}>
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/sign-in" element={<SignIn />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </AuthProvider>
      <ToastContainer />
    </>
  );
}

export default App;
