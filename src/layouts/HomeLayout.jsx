import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import CartProvider from "../providers/CartProvider";

export default function HomeLayout() {
  return (
    <>
      <CartProvider>
        <NavBar />
        <Outlet />
      </CartProvider>
    </>
  );
}
