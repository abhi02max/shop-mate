import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        const existingItem = cart.find((item) => item.id === product.id);
        if (existingItem) {
            setCart(cart.map(item => item.id === product.id ? {...item, amount: item.amount + 1} : item));
        } else {
            setCart([...cart, {...product, amount: 1}]);
        }
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const increaseAmount = (Id) => {
        const item = cart.find(item => item.id === Id);
        addToCart(item);
    };

    const decreaseAmount = (Id) => {
        const item = cart.find(item => item.id === Id); 
        if (item.amount === 1) {
            removeFromCart(Id);
        } else {
            setCart(cart.map(item => item.id === Id ? {...item, amount: item.amount - 1} : item));
        }
    };

    const clearCart = () => {
        setCart([]);
    };

    const total = cart.reduce((accumulator, currentitem) => 
        accumulator + currentitem.price * currentitem.amount, 0
    );

    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart, increaseAmount, decreaseAmount, clearCart, total}}>
            {children}
        </CartContext.Provider>
    );
};