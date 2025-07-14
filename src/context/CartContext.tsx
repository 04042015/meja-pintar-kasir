import React, { createContext, useContext, useState } from "react";

interface CartItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  items: CartItem[];
  total: number;
  createdAt: string;
}

interface CartContextType {
  orders: Order[];
}

const CartContext = createContext<CartContextType>({ orders: [] });

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // contoh data dummy agar build lancar
  const [orders] = useState<Order[]>([]);
  return <CartContext.Provider value={{ orders }}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
