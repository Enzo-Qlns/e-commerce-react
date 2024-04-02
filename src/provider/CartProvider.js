import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartsContext = createContext();

const CartsProvider = ({ children }) => {
    const [carts, setCarts_] = useState(localStorage.getItem("carts")||[]);

    const setCarts = (newCarts) => {
        setCarts_(newCarts);
    };

    useEffect(() => {
        // Cas ou on set un access_token
        if (carts) {
            localStorage.setItem("carts", carts);
        } else {
            localStorage.removeItem("carts");
        }
    }, [carts]);

    const contextValue = useMemo(
        () => ({
            carts,
            setCarts
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