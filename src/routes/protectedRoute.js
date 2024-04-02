import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import routes from "./routes";
import { jwtDecode } from 'jwt-decode';
import authService from "../api/authService";
import Navbar from "../components/default/Navbar";
import { useLocation } from "react-router-dom";

export const ProtectedRoute = () => {
    const { accessToken, refreshToken, user, setAccessToken, setRefreshToken } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Check if the user is authenticated
    if (!accessToken) {
        // If not authenticated, redirect to the login page
        return <Navigate to={routes.HOME} />;
    }

    if (!user) {
        // If not authenticated, redirect to the login page
        return <Navigate to={routes.HOME} />;
    }

    if (refreshToken) {
        const exp = new Date(jwtDecode(accessToken)?.exp * 1000);
        const currentDate = new Date();
        const remember_me = localStorage.getItem("remember_me") === "true" ? true : false;
        if (exp < currentDate) {
            if (remember_me) {
                authService.refresh_token(refreshToken, (statusCode, jsonRes) => {
                    if (200 === statusCode) {
                        setAccessToken(jsonRes.access_token);
                        setRefreshToken(jsonRes.refresh_token);
                    } else {
                        navigate(routes.AUTH);
                    };
                });
            } else {
                navigate(routes.AUTH);
            };
        };
    }
    // If authenticated, render the child routes
    return (
        <Navbar isConnected={true}>
            <Outlet />
        </Navbar>
    );
};