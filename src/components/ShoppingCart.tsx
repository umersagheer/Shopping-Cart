import useShoppingCart from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import CartItem from "./CartItem";
import StoreItems from "../data/items.json";
type ShoppingCartProps = {
  isOpen: boolean;
};

const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
  const { CloseCart, cartItems } = useShoppingCart();
  return (
    <div
      className={`fixed h-screen w-[35%] backdrop-blur-xl p-3 top-0 right-0 transition-all duration-300 ease-in ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } `}
    >
      <div className="flex items-center justify-around mb-5 text-3xl gap-44">
        <h2 className="font-bold ">Cart</h2>
        <button onClick={CloseCart}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-1 gap-5">
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      {cartItems.length > 0 && (
        <h3 className="my-4 text-2xl font-bold text-left">
          Total{" "}
          {formatCurrency(
            cartItems.reduce((total, cartItem) => {
              const item = StoreItems.find((i) => i.id === cartItem.id);
              return total + (item?.price || 0) * cartItem.quantity;
            }, 0)
          )}
        </h3>
      )}
    </div>
  );
};

export default ShoppingCart;
