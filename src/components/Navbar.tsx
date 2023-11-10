import { NavLink } from "react-router-dom";
import useShoppingCart from "../context/ShoppingCartContext";

const Navbar = () => {
  const { OpenCart, CartQuantity } = useShoppingCart();

  return (
    <nav className="flex items-center justify-around px-16 py-3 text-lg font-semibold shadow-lg bg-slate-900 gap-x-[500px]">
      <div className="flex gap-x-16">
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "text-slate-100"
              : "text-slate-400"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "text-slate-100"
              : "text-slate-400"
          }
        >
          About
        </NavLink>
        <NavLink
          to="/store"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "text-slate-100"
              : "text-slate-400"
          }
        >
          Store
        </NavLink>
      </div>
      <button
        className="relative p-2 border-2 rounded-lg border-slate-800"
        onClick={OpenCart}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
        <div className="absolute flex items-center justify-center w-5 h-5 text-base bg-red-700 rounded-full -bottom-2 -right-2">
          {CartQuantity}
        </div>
      </button>
    </nav>
  );
};

export default Navbar;
