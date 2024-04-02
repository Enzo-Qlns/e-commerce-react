import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { ProtectedRoute } from "./protectedRoute";
import routes from "./routes";
import Oops404 from "../views/error/Oops404.jsx";
import Login from "../views/public/auth/Login.jsx";
import Register from "../views/public/auth/Register.jsx";
import Profile from "../views/private/profile/Profile.jsx";
import PublicHome from "../views/public/Home.jsx";
import PrivateHome from "../views/private/Home.jsx";
import Navbar from "../components/default/Navbar.jsx";
import Shop from "../views/public/shop/Shop.jsx";
import ArticleView from "../views/public/shop/ArticleView.jsx";

const Routes = () => {
    const { accessToken, user } = useAuth();

    // Define public routes accessible to all users
    const routesForPublic = [
        {
            path: "*",
            element: <Oops404 />,
        },
    ];

    // Define routes accessible only to authenticated users
    const routesForAuthenticatedOnly = [
        {
            path: "/",
            element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
            children: [
                {
                    path: routes.HOME,
                    element: <PrivateHome />,
                },
                {
                    path: routes.PROFILE,
                    element: <Profile />,
                },
            ],
        },
    ];

    // Define routes accessible only to non-authenticated users
    const routesForNotAuthenticatedOnly = [
        {
            path: "/",
            element: <Navbar isConnected={false} />,
            children: [
                {
                    path: routes.HOME,
                    element: <PublicHome />,
                },
                {
                    path: routes.SHOP,
                    element: <Shop />,
                },
                {
                    path: routes.SHOP + "/:id",
                    element: <ArticleView />,
                },
                {
                    path: routes.AUTH,
                    element: <Login />,
                },
                {
                    path: routes.REGISTER,
                    element: <Register />,
                },
                {
                    path: routes.ALL,
                    element: <PublicHome />,
                },
            ]
        }
    ];

    // Combine and conditionally include routes based on authentication status
    const router = createBrowserRouter([
        ...routesForPublic,
        ...(!accessToken || !user ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly,
    ]);

    // Provide the router configuration using RouterProvider
    return <RouterProvider router={router} />;
};

export default Routes;