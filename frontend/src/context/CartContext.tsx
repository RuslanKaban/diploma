import { createContext, useContext, useEffect, useState, type ReactNode} from 'react';

type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number, size?: string, color?: string) => void;
  clearCart: () => void;
  totalPrice: number;
  totalCount: number;
  increaseQuantity: (id: number, size?: string, color?: string) => void;
  decreaseQuantity: (id: number, size?: string, color?: string) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.size === item.size &&
          cartItem.color === item.color
      );

      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id &&
          cartItem.size === item.size &&
          cartItem.color === item.color
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number, size?: string, color?: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(item.id === id && item.size === size && item.color === color)
      )
    );
  };

  const increaseQuantity = (id: number, size?: string, color?: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size && item.color === color
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id: number, size?: string, color?: string) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        totalPrice,
        totalCount,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart должен использоваться внутри CartProvider');
  }

  return context;
};