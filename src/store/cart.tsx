
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  color: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: any, quantity: number, size: string, color: string) => void;
  removeItem: (itemId: string) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      addItem: (product, quantity, size, color) => {
        const items = get().items;
        const itemId = `${product.id}-${size}-${color}`;
        const existingItemIndex = items.findIndex(item => item.id === itemId);

        if (existingItemIndex !== -1) {
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += quantity;
          set({ items: updatedItems });
        } else {
          set({
            items: [
              ...items,
              {
                id: itemId,
                productId: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                quantity,
                size,
                color,
              },
            ],
          });
        }
      },
      removeItem: (itemId) => {
        set({ items: get().items.filter((item) => item.id !== itemId) });
      },
      updateItemQuantity: (itemId, quantity) => {
        const items = get().items;
        const itemIndex = items.findIndex((item) => item.id === itemId);

        if (itemIndex !== -1) {
          const updatedItems = [...items];
          if (quantity <= 0) {
            updatedItems.splice(itemIndex, 1);
          } else {
            updatedItems[itemIndex].quantity = quantity;
          }
          set({ items: updatedItems });
        }
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
