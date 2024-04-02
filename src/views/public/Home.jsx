import { useEffect, useState } from "react";
import { useProgressBar } from "../../provider/ProgressBarProvider";
import categorieService from "../../api/categorieService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import productService from "../../api/productService";
import routes from "../../routes/routes";

export default function PublicHome() {
    const [categories, setCategories] = useState(null);
    const [products, setProducts] = useState(null);
    const { displayProgressBar } = useProgressBar();

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
        productService.get_products(0, 8, (statusCode, jsonRes) => {
            displayProgressBar(false);

            if (200 === statusCode) {
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
        <div className="mx-auto max-w-7xl">

            <div className="mx-auto max-w-2xl lg:max-w-none">
                <h2 className="text-2xl font-bold text-gray-200 mb-4">Derniers produits</h2>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products && products.map((product) => (
                        <Link key={product.id} to={routes.SHOP + "/" + product.id} className="group">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                <img
                                    src={product.images[0]}
                                    alt={"image de " + product.title}
                                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                                />
                            </div>
                            <h3 className="mt-4 text-sm text-gray-200">{product.title}</h3>
                            <p className="mt-1 text-lg font-medium text-gray-400">{product.price}€</p>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="mt-10 mx-auto max-w-2xl lg:max-w-none">
                <h2 className="text-2xl font-bold text-gray-200 mb-4">Catégories</h2>

                {/* Categories */}
                <div className="space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                    {categories && categories.map((categorie) => (
                        <div key={categorie.name} className="group relative">
                            <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                                <img
                                    src={categorie.image}
                                    alt={"image de  " + categorie.name}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                            <h3 className="mb-6 text-sm text-gray-400">
                                {categorie.name}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}