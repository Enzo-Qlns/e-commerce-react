import { useEffect, useState } from "react";
import { useProgressBar } from "../../../provider/ProgressBarProvider";
import categorieService from "../../../api/categorieService";
import { toast } from "react-toastify";
import { Link, useNavigate, useLocation } from "react-router-dom";
import productService from "../../../api/productService";
import routes from "../../../routes/routes";
import Utils from "../../../utils/Utils";
import QuickPreview from "../../../components/home/QuickPreview";
import { useCarts } from "../../../provider/CartProvider";

export default function PublicHome() {
    const [categories, setCategories] = useState(null);
    const [products, setProducts] = useState(null);
    const [productPreview, setProductPreview] = useState(null);
    const navigate = useNavigate();
    const { carts, setCarts } = useCarts();
    console.log(carts)
    const { displayProgressBar } = useProgressBar();
    const location = useLocation();
    const query = new URLSearchParams(location.search);

    const fetchCategories = () => {
        categorieService.get_categories((statusCode, jsonRes) => {
            displayProgressBar(false);

            if (200 === statusCode) {
                setCategories(jsonRes);
            } else {
                toast.error("Une erreur est survenue, veuillez réessayer ultérieure");
            };
        });
    }

    const fetchProducts = () => {
        let q = "?offset=0&limit=10";
        productService.get_products(q, (statusCode, jsonRes) => {
            displayProgressBar(false);

            if (200 === statusCode) {
                let productId = query.get('productId');
                setProductPreview(jsonRes?.find(product => product?.id?.toString() === productId?.toString()));

                setProducts(jsonRes);
            } else {
                toast.error("Une erreur est survenue, veuillez réessayer ultérieure");
            };
        });
    }

    useEffect(() => {
        fetchCategories();
        fetchProducts();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="mx-auto">

            {/* QuickPreview */}
            {!Utils.isEmpty(productPreview) && (
                <QuickPreview
                    product={productPreview}
                    open={!!productPreview}
                    onClose={() => {
                        setProductPreview(null);
                        navigate(routes.HOME);
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
                        setProductPreview(null);
                    }}
                />
            )}
            {/* End QuickPreview */}

            {/* First Page */}
            <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
                <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                    <div className="sm:max-w-lg">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-200 sm:text-6xl">
                            Nouveaux style
                        </h1>
                        <p className="mt-4 text-xl text-gray-500">
                            Nouvelles collections.
                        </p>
                    </div>
                    <div>
                        <div className="mt-10">
                            <Link
                                to={routes.SHOP}
                                className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
                            >
                                Découvrir
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* EndFirst Page */}

            {/* Product */}
            <div className="mx-auto max-w-2xl lg:max-w-none">
                <h2 className="text-2xl font-bold text-gray-200 mb-4">Derniers produits</h2>

                {Utils.isEmpty(products)
                    ? <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} role="status" className="border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                                <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                                    <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                    </svg>
                                </div>
                                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-60 mb-4"></div>
                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                        ))}
                    </div>
                    : <div
                        className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
                    >
                        {products && products.map((product) => (
                            <Link
                                key={product.id}
                                to={Utils.addQueryParam(routes.HOME, 'productId', product?.id?.toString())}
                                onClick={() => {
                                    setProductPreview(product);
                                }}
                            >
                                <div
                                    className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
                                    data-aos="zoom-in"
                                >
                                    <img
                                        src={product.images[0]}
                                        alt={"image de " + product.title}
                                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                                    />
                                </div>
                                <h3
                                    className="mt-4 text-sm text-gray-200"
                                    data-aos="zoom-in"
                                >
                                    {product.title}
                                </h3>
                                <p
                                    className="mt-1 text-lg font-medium text-gray-400"
                                    data-aos="zoom-in"
                                >
                                    {product.price}€
                                </p>
                            </Link>
                        ))}
                    </div>}
            </div>
            {/* End Products */}

            {/* Categories */}
            <div className="mt-10 mx-auto max-w-2xl lg:max-w-none">
                <h2 className="text-2xl font-bold text-gray-200 mb-4">Catégories</h2>

                {Utils.isEmpty(categories)
                    ? <div className="space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} role="status" className="border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                                <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                                    <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                    </svg>
                                </div>
                                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-60 mb-4"></div>
                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                        ))}
                    </div>
                    : <div className="space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                        {categories?.slice(0, 3)?.map((category) => (
                            <div data-aos="zoom-in" key={category?.id} className="group relative">
                                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                                    <Link to={Utils.addQueryParam(routes.SHOP, 'categoryId', category?.id)}>
                                        <img
                                            src={category?.image}
                                            alt={"image de " + category?.name}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </Link>
                                </div>
                                <h3 className="mt-1 mb-6 text-sm text-gray-400">
                                    {category?.name}
                                </h3>
                            </div>
                        ))}
                    </div>}
            </div>
            {/* End Categories */}

        </div >
    )
}