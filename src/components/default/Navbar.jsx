import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import routes from "../../routes/routes.js"
import { Button } from 'flowbite-react'
import ShoppingCarts from '../shop/ShoppingCarts.jsx'
import ProgressBarProvider from '../../provider/ProgressBarProvider.js'
import { HiShoppingBag } from "react-icons/hi";
import { useCarts } from '../../provider/CartProvider.js'
import Utils from '../../utils/Utils.js'

export default function Navbar({ isConnected, children }) {
    const location = useLocation();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const { carts } = useCarts();

    if (isConnected) {
        return (
            <>
                <Disclosure as="nav" className="bg-gray-800">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                                <div className="relative flex h-16 items-center justify-between">
                                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                        {/* Mobile menu button*/}
                                        <Disclosure.Button
                                            className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                        >
                                            <span className="absolute -inset-0.5" />
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                        <div className="hidden sm:ml-6 sm:block">
                                            <div className="flex space-x-4">
                                                <Link
                                                    to={routes.HOME}
                                                    className={Utils.classNames(
                                                        location.pathname.includes(routes.HOME) ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'rounded-md px-3 py-2 text-sm font-medium'
                                                    )}
                                                    aria-current={location.pathname.includes(routes.HOME)}
                                                >
                                                    Accueil
                                                </Link>
                                                <Link
                                                    to={routes.SHOP}
                                                    className={Utils.classNames(
                                                        location.pathname === routes.SHOP ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'rounded-md px-3 py-2 text-sm font-medium'
                                                    )}
                                                    aria-current={location.pathname.includes(routes.HOME)}
                                                >
                                                    Boutiques
                                                </Link>
                                                <Link
                                                    to={routes.PROFILE}
                                                    className={Utils.classNames(
                                                        location.pathname.includes(routes.PROFILE) ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'rounded-md px-3 py-2 text-sm font-medium'
                                                    )}
                                                    aria-current={location.pathname.includes(routes.PROFILE)}
                                                >
                                                    Profile
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                                        {/* Profile dropdown */}
                                        <Menu as="div" className="relative ml-3">
                                            <Button
                                                size={"sm"}
                                                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                                            >
                                                Panier
                                            </Button>
                                            <ShoppingCarts
                                                open={isDrawerOpen}
                                                setOpen={setIsDrawerOpen}
                                            />
                                        </Menu>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="sm:hidden">
                                <div className="space-y-1 px-2 pb-3 pt-2">
                                    <Disclosure.Button
                                        className={Utils.classNames(
                                            location.pathname.includes(routes.HOME) ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'block rounded-md px-3 py-2 text-base font-medium'
                                        )}
                                        aria-current={location.pathname.includes(routes.HOME)}
                                    >
                                        <Link to={routes.HOME}>
                                            Accueil
                                        </Link>
                                    </Disclosure.Button>
                                    <Disclosure.Button
                                        className={Utils.classNames(
                                            location.pathname.includes(routes.SHOP) ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'block rounded-md px-3 py-2 text-base font-medium'
                                        )}
                                        aria-current={location.pathname.includes(routes.SHOP)}
                                    >
                                        <Link to={routes.SHOP}>
                                            Boutiques
                                        </Link>
                                    </Disclosure.Button>
                                    <Disclosure.Button
                                        className={Utils.classNames(
                                            location.pathname.includes(routes.PROFILE) ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'block rounded-md px-3 py-2 text-base font-medium'
                                        )}
                                        aria-current={location.pathname.includes(routes.PROFILE)}
                                    >
                                        <Link to={routes.PROFILE}>
                                            Profile
                                        </Link>
                                    </Disclosure.Button>
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
                <main className="mx-auto p-6 sm:p-6 lg:p-8">
                    <ProgressBarProvider>
                        {children}
                    </ProgressBarProvider>
                </main>
            </>
        )
    }

    return (
        <>
            <Disclosure as="nav" className="fixed w-full z-10 bg-gray-800">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/* Mobile menu button*/}
                                    <Disclosure.Button
                                        className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                    >
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                    <div className="hidden sm:ml-6 sm:block">
                                        <div className="flex space-x-4">
                                            <Link
                                                to={routes.HOME}
                                                className={Utils.classNames(
                                                    location.pathname.includes(routes.HOME) ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )}
                                                aria-current={location.pathname.includes(routes.HOME)}
                                            >
                                                Accueil
                                            </Link>
                                            <Link
                                                to={routes.SHOP}
                                                className={Utils.classNames(
                                                    location.pathname.includes(routes.SHOP) ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )}
                                                aria-current={location.pathname.includes(routes.SHOP)}
                                            >
                                                Boutiques
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    <Menu as="div" className="flex items-center justify-between w-40 relative ml-3">
                                        <button onClick={() => setIsDrawerOpen(true)} type="button" className="relative inline-flex items-center">
                                            <HiShoppingBag size={30} />
                                            <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-cyan-600 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                                                {Utils.objSize(carts)}
                                            </div>
                                        </button>
                                        <Button
                                            size={"sm"}
                                            onClick={() => navigate(routes.AUTH)}
                                        >
                                            Se connecter
                                        </Button>
                                        <ShoppingCarts
                                            open={isDrawerOpen}
                                            setOpen={setIsDrawerOpen}
                                        />
                                    </Menu>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="sm:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2">
                                <Disclosure.Button
                                    className={Utils.classNames(
                                        location.pathname.includes(routes.HOME) ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={location.pathname.includes(routes.HOME)}
                                >
                                    <Link to={routes.HOME}>
                                        Accueil
                                    </Link>
                                </Disclosure.Button>
                                <Disclosure.Button
                                    className={Utils.classNames(
                                        location.pathname === routes.SHOP ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={location.pathname === routes.SHOP ? 'page' : undefined}
                                >
                                    <Link to={routes.SHOP}>
                                        Boutiques
                                    </Link>
                                </Disclosure.Button>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
            <main className="mx-auto p-6 pt-20 sm:p-6 sm:pt-20 lg:p-8 lg:pt-20">
                <ProgressBarProvider>
                    <Outlet />
                </ProgressBarProvider>
            </main>
        </>
    )
}
