import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart_] = useState(localStorage.getItem("cart"));

    const setCart = (newCart) => {
        setCart_(newCart);
    };

    useEffect(() => {
        // Cas ou on set un access_token
        if (cart) {
            localStorage.setItem("cart", accessToken);
        } else {
            localStorage.removeItem("cart");
        }
    }, [cart]);

    const contextValue = useMemo(
        () => ({
            cart,
            setCart
        }),
        [cart]
    );

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};

export default CartProvider;