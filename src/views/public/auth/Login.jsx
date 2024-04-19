import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../provider/AuthProvider';
import routes from '../../../routes/routes';
import authService from '../../../api/authService';
import Utils from '../../../utils/Utils';
import { jwtDecode } from 'jwt-decode';
import { Button } from 'flowbite-react';
import { AiOutlineLoading } from "react-icons/ai";

export default function Login() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { setAccessToken, setRefreshToken, setUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const noConnected = query.get('redirect') === 'no-connected';

    const fetchProfile = (access_token, refresh_token) => {
        authService.profile(access_token, (statusCode, jsonRes) => {
            setLoading(false);
            if (200 === statusCode) {
                setUser(JSON.stringify(jsonRes));
                setAccessToken(access_token);
                setRefreshToken(refresh_token);

                navigate(noConnected ? routes.SUMMARY : routes.HOME);
            } else if (401 === statusCode) {
                setLoading(false);
                setError('Identifiant ou mot de passe invalide');
            } else {
                setLoading(false);
                setError("Une erreur est survenue, veuillez réessayer ultérieurement.");
            };
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        const data = new FormData(event.currentTarget);

        authService.authenticate(data.get('email'), data.get('password'), (statusCode, jsonRes) => {
            if (201 === statusCode) {
                fetchProfile(jsonRes?.access_token, jsonRes?.refresh_token);
            } else if (401 === statusCode) {
                setLoading(false);
                setError('Identifiant ou mot de passe invalide');
            } else {
                setLoading(false);
                setError("Une erreur est survenue, veuillez réessayer ultérieurement.");
            };
        });
    };

    return (
        <div className="flex flex-col items-center mt-2 mx-auto lg:py-0">
            <div href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                E-commerce React
            </div>
            {noConnected && (
                <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                    <span className="font-medium">Information !</span> Veuillez vous connecter avant de procéder au paiement.
                </div>)}
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Connectez-vous à votre compte
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com"
                                autoComplete='off'
                                required
                            />
                            {!Utils.isEmpty(error) && (
                                <div className="p-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    <span className="font-medium">{error}</span>
                                </div>)}
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                autoComplete='off'
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            />
                            {!Utils.isEmpty(error) && (
                                <div className="p-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    <span className="font-medium">{error}</span>
                                </div>)}
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="remember"
                                        aria-describedby="remember"
                                        type="checkbox"
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        onChange={(event) => {
                                            localStorage.setItem('remember_me', event.target.checked);
                                        }}
                                        defaultChecked={localStorage.getItem('remember_me') === "true" ? true : false}
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Se souvenir de moi</label>
                                </div>
                            </div>
                            <Link href="#" className="text-sm font-medium text-blue-500 hover:underline dark:text-blue-400">Mot de passe oublié ?</Link>
                        </div>
                        <Button
                            className="border-transparent focus:border-transparent focus:ring-0 w-full"
                            type="submit"
                            isProcessing={loading}
                            processingSpinner={<AiOutlineLoading className="h-6 w-6 animate-spin" />}
                        >
                            Se connecter
                        </Button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Vous n'avez pas encore de compte ?&nbsp;
                            <Link to={routes.REGISTER} className="font-medium text-primary-600 hover:underline dark:text-primary-500">S'inscrire</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}