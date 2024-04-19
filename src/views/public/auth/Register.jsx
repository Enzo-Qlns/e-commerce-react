import { Button } from 'flowbite-react'
import { useEffect, useState } from 'react';
import { useProgressBar } from "../../../provider/ProgressBarProvider";
import { Link } from 'react-router-dom';
import routes from '../../../routes/routes';
import userService from '../../../api/userService';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const { displayProgressBar } = useProgressBar();
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const submit = (e) => {
        const data = new FormData(e.currentTarget);
        setError();

        e.preventDefault();

        if (data.get('password') !== data.get('confirm-password')) {
            setError({ password: "Les mot de passes sont incorrectes", confirm_password: "Les mot de passes sont incorrectes" });
        }

        userService.create_user(data.get('name'), data.get('email'), data.get('password'), data.get('avatar'), (statusCode, jsonRes) => {
            if (201 === statusCode) {
                toast.success("Compte crée avec succès.");
                navigate(routes.AUTH);
            } else {
                toast.error("Une erreur est survenue, veuillez réessayer ultérieure.");
            };
        });
    }

    useEffect(() => {
        setTimeout(() => {
            displayProgressBar(false);
        }, 250);
    }, []);

    return (
        <div className="flex flex-col items-center  mx-auto md:h-screen lg:py-0">
            <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                E-commerce React
            </div>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Création de compte
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={submit}>
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vore nom</label>
                            <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" required />
                            <span className="text-red-400">{error?.name}</span>
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vore email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                            <span className="text-red-400">{error?.email}</span>
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            <span className="text-red-400">{error?.password}</span>
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe de confirmation</label>
                            <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            <span className="text-red-400">{error?.confirm_password}</span>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Avatar</label>
                            <input type="text" name="avatar" id="avatar" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='https://picsum.photos/200' required />
                            <span className="text-red-400">{error?.avatar}</span>
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">J'accepte les <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Termes et conditions</a></label>
                            </div>
                        </div>
                        <Button type="submit" className="w-full text-white focus:ring-0 font-medium rounded-lg text-sm px-5">Création de compte</Button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Vous avez un déjà un compte ? <Link to={routes.AUTH} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Connectez-vous ici</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}