import useShoppingCart from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";

type StoreItemsProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

const StoreItem = ({ id, name, price, imgUrl }: StoreItemsProps) => {
  const {
    GetItemQuantity,
    IncreaseCartQuantity,
    DecreaseCartQuantity,
    RemoveFromCart,
  } = useShoppingCart();
  const quantity = GetItemQuantity(id);

  return (
    <div className="p-3 border-2 rounded-lg border-slate-500 bg-slate-950 min-h-[350px]">
      <div className="max-w-lg aspect-video">
        <img
          src={imgUrl}
          alt="card Image"
          className="object-cover w-full h-full rounded-md"
        />
      </div>
      <div className="flex items-center justify-between my-3 text-lg font-bold">
        <p>{name}</p>
        <p className="text-slate-400">{formatCurrency(price)}</p>
      </div>
      {/* Displaying buttons conditionally, if there is any item in the cart */}
      {quantity === 0 ? (
        <div className="flex justify-center">
          <button
            className="px-3 py-1 mt-5 bg-blue-800 rounded-md active:bg-blue-700"
            onClick={() => IncreaseCartQuantity(id)}
          >
            + Add to cart
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center gap-6 text-xl">
            <button
              className="px-4 py-2 border rounded-md bg-slate-700 border-slate-600 active:bg-slate-600 "
              onClick={() => DecreaseCartQuantity(id)}
            >
              -
            </button>
            <p>{quantity}</p>
            <button
              className="px-4 py-2 border rounded-md border-slate-700 bg-slate-600 active:bg-slate-600 "
              onClick={() => IncreaseCartQuantity(id)}
            >
              +
            </button>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="px-3 py-1 mt-3 rounded-md active:bg-rose-800 bg-rose-900"
              onClick={() => RemoveFromCart(id)}
            >
              Remove
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default StoreItem;
