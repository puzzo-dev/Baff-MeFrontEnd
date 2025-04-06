import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '@/lib/types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  
  // Actions
  addItem: (product: Product, quantity: number, size: string, color: string) => void;
  removeItem: (itemId: string) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Cart UI
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  
  // Cart calculations
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addItem: (product, quantity, size, color) => {
        const items = get().items;
        const itemId = `${product.id}-${size}-${color}`;
        
        // Check if item exists with the same options
        const existingItemIndex = items.findIndex(
          (item) => item.id === itemId
        );
        
        if (existingItemIndex !== -1) {
          // Update quantity if item exists
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += quantity;
          set({ items: updatedItems });
        } else {
          // Add new item
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
        set({
          items: get().items.filter((item) => item.id !== itemId),
        });
      },
      
      updateItemQuantity: (itemId, quantity) => {
        const items = get().items;
        const itemIndex = items.findIndex((item) => item.id === itemId);
        
        if (itemIndex !== -1) {
          const updatedItems = [...items];
          
          if (quantity <= 0) {
            // Remove item if quantity is 0 or less
            updatedItems.splice(itemIndex, 1);
          } else {
            // Update quantity
            updatedItems[itemIndex].quantity = quantity;
          }
          
          set({ items: updatedItems });
        }
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      
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
      name: 'baff-me-cart',
    }
  )
);
