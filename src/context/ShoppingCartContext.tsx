import { createContext, useContext, ReactNode, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

// Types
type ShoppingCartContextProps = {
  children: ReactNode;
};
type CartItem = {
  id: number;
  quantity: number;
};
type ShoppingCartContext = {
  OpenCart: () => void;
  CloseCart: () => void;
  GetItemQuantity: (id: number) => number;
  IncreaseCartQuantity: (id: number) => void;
  DecreaseCartQuantity: (id: number) => void;
  RemoveFromCart: (id: number) => void;
  CartQuantity: number;
  cartItems: CartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

// eslint-disable-next-line react-refresh/only-export-components
export default function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartContextProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );
  const [isOpen, setIsOpen] = useState(false);

  const CartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const OpenCart = () => setIsOpen(true);
  const CloseCart = () => setIsOpen(false);

  function GetItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function IncreaseCartQuantity(id: number) {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id) == null) {
        return [...currentItems, { id, quantity: 1 }];
      } else {
        return currentItems.map((item) => {
          return item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        });
      }
    });
  }

  function DecreaseCartQuantity(id: number) {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id)?.quantity === 1) {
        return currentItems.filter((item) => item.id !== id);
      } else {
        return currentItems.map((item) => {
          return item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item;
        });
      }
    });
  }

  function RemoveFromCart(id: number) {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item.id !== id);
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        IncreaseCartQuantity,
        DecreaseCartQuantity,
        GetItemQuantity,
        RemoveFromCart,
        OpenCart,
        CloseCart,
        cartItems,
        CartQuantity,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
