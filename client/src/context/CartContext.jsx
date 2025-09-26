import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      
      const existingItem = state.items.find(item => item.id === action.payload.id);   // Check if item already in cart
      const quantityToAdd = action.payload.quantity || 1;   // Default to adding 1 if no quantity specified
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + quantityToAdd }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: quantityToAdd }]
      };
    }
    case 'REMOVE_FROM_CART': 
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0)
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };

    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: []
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('puzzleCart');
    if (savedCart) {
      dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('puzzleCart', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (puzzle) => {
    // Normalize incoming product shape for cart usage
    const normalized = {
      id: puzzle.id || puzzle._id,
      title: puzzle.title,
      price: puzzle.price,
      pieces: puzzle.pieces,
      difficulty: puzzle.difficulty,
      image: puzzle.image,
      quantity: puzzle.quantity || 1
    };
    dispatch({ type: 'ADD_TO_CART', payload: normalized });
  };

  const removeFromCart = (puzzleId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: puzzleId });
  };

  const updateQuantity = (puzzleId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: puzzleId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    items: state.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
