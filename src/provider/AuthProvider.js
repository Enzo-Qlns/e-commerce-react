import { createContext, useContext, useEffect, useMemo, useState } from "react";
import CartsProvider from "./CartProvider";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken_] = useState(localStorage.getItem("access_token"));
    const [refreshToken, setRefreshToken_] = useState(localStorage.getItem("refresh_token"));
    const [user, setUser_] = useState(localStorage.getItem("user"));

    const setAccessToken = (newToken) => {
        setAccessToken_(newToken);
    };

    const setRefreshToken = (newToken) => {
        setRefreshToken_(newToken);
    };

    const setUser = (newUser) => {
        setUser_(newUser);
    };

    useEffect(() => {
        // Cas ou on set un access_token
        if (accessToken) {
            localStorage.setItem("access_token", accessToken);
        } else {
            localStorage.removeItem("access_token");
        }
        // Cas ou on set un refreshToken
        if (refreshToken) {
            localStorage.setItem("refresh_token", refreshToken);
        } else {
            localStorage.removeItem("refresh_token");
        }
        // Cas ou on set un user
        if (user) {
            localStorage.setItem("user", user);
        } else {
            localStorage.removeItem("user");
        }
    }, [accessToken, refreshToken, user]);

    const contextValue = useMemo(
        () => ({
            accessToken,
            refreshToken,
            user,
            setUser,
            setAccessToken,
            setRefreshToken,
        }),
        [accessToken, refreshToken]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            <CartsProvider>
                {children}
            </CartsProvider>
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;