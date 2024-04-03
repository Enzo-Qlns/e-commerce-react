import { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { useProgressBar } from "../../../provider/ProgressBarProvider";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import categorieService from '../../../api/categorieService';
import { toast } from 'react-toastify';
import routes from '../../../routes/routes';
import Utils from '../../../utils/Utils';
import productService from '../../../api/productService';
import { Button } from "flowbite-react";
import { useCarts } from '../../../provider/CartProvider';
import QuickPreview from '../../../components/home/QuickPreview';

const sortOptions = [
    { name: 'Newest', query: 'newest', current: false },
    { name: 'Price: Low to High', query: 'LowtoHigh', current: false },
    { name: 'Price: High to Low', query: 'HightoLow', current: false },
]

export default function Shop() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [categories, setCategories] = useState(null);
    const [products, setProducts] = useState(null);
    const [productPreview, setProductPreview] = useState(null);
    const [displayQuickPreview, setDisplayQuickPreview] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { displayProgressBar } = useProgressBar();
    const { carts, setCarts } = useCarts();
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);

    const fetchCategories = () => {
        categorieService.get_categories((statusCode, jsonRes) => {
            displayProgressBar(false);

            if (200 === statusCode) {
                setCategories(jsonRes);
            } else {
                toast.error("Une erreur est survenue, veuillez réessayer ultérieurement");
            };
        });
    }

    const fetchProducts = (q) => {
        setIsLoading(true);

        productService.get_products(q, (statusCode, jsonRes) => {
            setIsLoading(false);
            displayProgressBar(false)

            if (200 === statusCode) {
                let sort = query?.get('sort');
                // Cas ou on ne trie pas 
                if (Utils.isEmpty(sort)) {
                    setProducts(jsonRes);
                } else { // Cas ou on trie
                    let productsUpdated = jsonRes.sort((a, b) => {
                        if (sort === 'LowtoHigh') {
                            return a.price - b.price;
                        } else if (sort === 'HightoLow') {
                            return b.price - a.price;
                        } else if (sort === 'newest') {
                            return new Date(b.creationAt) - new Date(a.creationAt);
                        }
                    });
                    setProducts(productsUpdated);
                }
            } else {
                toast.error("Une erreur est survenue, veuillez réessayer ultérieure");
            };
        });
    }

    useEffect(() => {
        fetchCategories();
        let q = "?offset=0&limit=12";
        if (query.size === 0) {
            fetchProducts(q);
        }
    }, []);

    useEffect(() => {
        if (!Utils.isEmpty(location.search)) {
            if (!Utils.isEmpty(query.get('categoryId'))) {
                let q = "?categoryId=" + query.get('categoryId') + "&offset=0&limit=10"
                fetchProducts(q);
            } else {
                fetchProducts();
            }
        };
    }, [query.get('categoryId'), query.get('sort')]);

    return (
        <div className="bg-slate-800 rounded-lg">

            {!Utils.isEmpty(productPreview) && (
                <QuickPreview
                    product={productPreview}
                    open={displayQuickPreview}
                    onClose={() => {
                        setDisplayQuickPreview(false);
                        navigate(routes.SHOP);
                        fetchProducts();
                    }}
                    onAddCarts={(productAdded) => {
                        const existingProductIndex = carts.findIndex(item => item.id === productAdded.id);
                        if (existingProductIndex !== -1) {
                            const updatedCarts = [...carts];
                            const existingProduct = updatedCarts[existingProductIndex];
                            existingProduct.quantity += productAdded.quantity;
                            updatedCarts[existingProductIndex] = existingProduct;
                            setCarts(updatedCarts);
                        } else {
                            // Le produit n'existe pas encore dans le panier, on l'ajoute alors
                            setCarts([...carts, productAdded]);
                        }
                        navigate(routes.HOME);
                        setDisplayQuickPreview(false);
                        fetchProducts();
                    }}
                />)}

            {/* Mobile filter dialog */}
            <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                <div className="flex items-center justify-between px-4">
                                    <h2 className="text-lg font-medium text-gray-400">Filters</h2>
                                    <button
                                        type="button"
                                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                        onClick={() => setMobileFiltersOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                {/* Filters */}
                                <div className="roundmt-4 border-t border-gray-200">
                                    <h3 className="sr-only">Categories</h3>
                                    <ul role="list" className="px-2 py-3 font-medium text-gray-500">
                                        {categories && Utils.removeDuplicatesCategories(categories).map((category) => (
                                            <li key={category?.id}>
                                                <Link
                                                    to={Utils.addQueryParam(routes.SHOP, 'categoryId', category?.id)}
                                                    className={Utils.classNames(
                                                        query?.get('categoryId')?.toString() === category?.id?.toString() ? 'bg-gray-900 text-white' : 'border-transparent',
                                                        "block rounded px-2 py-3")
                                                    }
                                                >
                                                    {category?.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-6">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-400">Produits</h1>

                    <div className="flex items-center">
                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <Menu.Button className="group inline-flex justify-center text-sm font-medium hover:text-gray-400">
                                    Sort
                                    <ChevronDownIcon
                                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true"
                                    />
                                </Menu.Button>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        {sortOptions.map((option) => (
                                            <Menu.Item key={option?.name}>
                                                {({ active }) => (
                                                    <Link
                                                        to={Utils.addQueryParam(routes.SHOP, 'sort', option?.query)}
                                                        className={Utils.classNames(
                                                            query.get('sort') === option?.query ? 'font-medium text-gray-700' : 'text-gray-500',
                                                            active ? 'bg-gray-100' : '',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        {option?.name}
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        ))}
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>

                        <button
                            type="button"
                            className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                            onClick={() => setMobileFiltersOpen(true)}
                        >
                            <span className="sr-only">Filters</span>
                            <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                </div>

                <section aria-labelledby="products-heading" className="pb-24 pt-6">
                    <h2 id="products-heading" className="sr-only">
                        Products
                    </h2>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                        {/* Filters */}
                        <div className="hidden lg:block">
                            <h3 className="sr-only">Categories</h3>
                            {categories
                                ? <Disclosure defaultOpen={!!categories.find(elt => elt?.id?.toString() === query?.get('categoryId')?.toString())} as="div" className="py-6">
                                    {({ open }) => (
                                        <>
                                            <h3 className="-my-3 flow-root">
                                                <Disclosure.Button
                                                    className="flex w-full items-center justify-between rounded bg-cyan-500 p-3 text-sm"
                                                >
                                                    <span className="font-medium">Catégories</span>
                                                    <span className="ml-6 flex items-center">
                                                        {open ? (
                                                            <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                        ) : (
                                                            <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                        )}
                                                    </span>
                                                </Disclosure.Button>
                                            </h3>
                                            <Disclosure.Panel className="pt-6">
                                                <div className="space-y-1">
                                                    {Utils.removeDuplicatesCategories(categories).map((category) => (
                                                        <Link
                                                            key={category?.id}
                                                            to={Utils.addQueryParam(routes.SHOP, 'categoryId', category?.id)}
                                                            className={Utils.classNames(
                                                                query?.get('categoryId')?.toString() === category?.id?.toString() ? 'bg-gray-900' : 'border-transparent',
                                                                "block rounded-md px-3")
                                                            }
                                                            aria-current={query.get('category') === category?.name}
                                                        >
                                                            {category?.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                                : <div role="status" className="max-w-sm animate-pulse">
                                    <div className="w-full bg-gray-200 rounded dark:bg-gray-700 py-6"></div>
                                </div>
                            }
                        </div>

                        {/* Product grid */}
                        <div className="lg:col-span-3">
                            <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-1">
                                <h2 className="sr-only">Products</h2>
                                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                                    {isLoading && (
                                        <>
                                            {[...Array(12)].map((_, index) => (
                                                <div key={index} role="status" className="max-w-sm p-4 border border-gray-900 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                                                    <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                                                        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                                            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                                        </svg>
                                                    </div>
                                                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                    {products && products.map((product) => (
                                        <div key={product?.id} href={product?.href} className="group">
                                            <div className="h-56 rounded sm:h-64 xl:h-80 2xl:h-96">
                                                <img
                                                    src={product?.images[0]}
                                                    alt={"image de " + product?.title}
                                                    className="h-full rounded w-full object-cover object-center group-hover:opacity-75"
                                                />
                                            </div>
                                            <h3 className="mt-4 text-sm">{product?.title}</h3>
                                            <div className="flex items-center justify-between mt-2">
                                                <p className="mt-1 text-lg font-medium text-gray-100">{product?.price}€</p>
                                                <Button
                                                    color="light"
                                                    className='focus:ring-0'
                                                    onClick={() => {
                                                        setProductPreview(product);
                                                        setDisplayQuickPreview(true);
                                                    }}
                                                >
                                                    Ajouter au panier
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}