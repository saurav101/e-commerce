import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { createContext, useEffect, useContext, useState } from "react";
import Products from "./pages/Products";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardProducts from "./pages/dashboard/DashboardProducts";

const queryClient = new QueryClient();
const AuthUserContext = createContext(null);

export const useAuthUser = () => {
  return useContext(AuthUserContext);
};

const getValueFromLocalStorage = () => {
  const authUser = localStorage.getItem("authUser");
  return authUser ? JSON.parse(authUser) : null;
};
function HomeLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
function GuestRoutes() {
  const { authUser } = useAuthUser();
  if (authUser) return <Navigate to="/" />;
  return <Outlet />;
}
function ProtectedRoutes() {
  const { authUser } = useAuthUser();
  if (!authUser) return <Navigate to="/sign-in" />;
  return <Outlet />;
}
function AdminRoutes() {
  const { authUser } = useAuthUser();
  if (authUser.roles.includes("Admin")) return <Outlet />;
  return <Navigate to="/" />;
}


function App() {
  const [authUser, setAuthUser] = useState(getValueFromLocalStorage);

  useEffect(() => {
    localStorage.setItem("authUser", JSON.stringify(authUser));
  }, [authUser]);

  return (
    <AuthUserContext.Provider value={{ authUser, setAuthUser }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<HomeLayout />}>
            
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/orders" element={<h2>Orders Page</h2>} />
                <Route path="/profile" element={<h2>Profile Page</h2>} />
              </Route>
            </Route>

            <Route element={<AdminRoutes />}>
            <Route element={<Dashboard />}>
             <Route path="/dashboard/products" element={<DashboardProducts/>} />
            <Route path="/dashboard/users" element={<h2>users list</h2>} />
            <Route path="/dashboard/orders" element={<h2>orders list</h2>} />
            </Route>
            </Route>

            <Route element={<GuestRoutes />}>
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/sign-in" element={<SignIn />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </AuthUserContext.Provider>
  );
}

export default App;
