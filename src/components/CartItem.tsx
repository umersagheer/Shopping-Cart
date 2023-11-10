import useShoppingCart from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";
type CartItemProps = {
  id: number;
  quantity: number;
};

const CartItem = ({ id, quantity }: CartItemProps) => {
  const { RemoveFromCart } = useShoppingCart();

  const item = storeItems.find((i) => i.id === id);
  if (item == null) return null;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-center gap-3">
        <div className="overflow-hidden rounded-md w-36 aspect-video">
          <img
            src={item.imgUrl}
            alt="Product Image"
            className="object-cover rounded-md"
          />
        </div>
        <div>
          <span>{item.name}</span>
          {quantity > 1 && (
            <span className="text-xs text-white/80"> x {quantity}</span>
          )}
          <p className="text-white/80">{formatCurrency(item.price)}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <p>{formatCurrency(item.price)}</p>
        <button
          className="px-2 py-1 rounded-md active:bg-rose-800 bg-rose-900"
          onClick={() => RemoveFromCart(id)}
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
