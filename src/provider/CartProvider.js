import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartsContext = createContext();

const CartsProvider = ({ children }) => {
    const [carts, setCarts_] = useState(localStorage.getObj("carts") || []);

    const setCarts = (newCarts) => {
        setCarts_(newCarts);
    };

    const removeCart = (cartToRemove) => {
        setCarts_(carts.filter(cart => cart.id !== cartToRemove.id));
    }

    useEffect(() => {
        // Cas ou on set un access_token
        if (carts) {
            localStorage.setObj("carts", carts);
        } else {
            localStorage.setObj("carts", []);
        }
    }, [carts]);

    const contextValue = useMemo(
        () => ({
            carts,
            setCarts,
            removeCart
        }),
        [carts]
    );

    return (
        <CartsContext.Provider value={contextValue}>
            {children}
        </CartsContext.Provider>
    );
};

export const useCarts = () => {
    return useContext(CartsContext);
};

export default CartsProvider;

Storage.prototype.setObj = function (key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key))
}