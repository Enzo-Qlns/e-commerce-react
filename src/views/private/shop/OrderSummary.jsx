import { useEffect, useState } from "react"
import { useProgressBar } from "../../../provider/ProgressBarProvider";
import { useCarts } from "../../../provider/CartProvider";
import { AiOutlineLoading } from "react-icons/ai";
import { Button } from 'flowbite-react'

export default function OrdreSummary() {
    const { displayProgressBar } = useProgressBar();
    const { carts, setCarts, removeCart } = useCarts();
    const total = carts?.reduce((accumulator, currentItem) => accumulator + (currentItem.price * currentItem.quantity), 0);
    const [isLoading, setIsLoading] = useState(false);
    const [info, setInfo] = useState(false);

    const submitPayment = (e) => {
        setIsLoading(true);;
        e.preventDefault();
        
        setTimeout(() => {
            setIsLoading(false);
            setInfo("Paiement effectué avec succès.")
            removeCart();
        }, 1000);
    }

    useEffect(() => {
        setTimeout(() => {
            displayProgressBar(false)
        }, 250);
        // eslint-disable-next-line
    }, []);

    return (
        <div className="bg-slate-800 rounded-lg">
            <section
                className="relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
                <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
                    <div className="grid grid-cols-12">
                        <div
                            className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto"
                        >
                            {!!info && (
                                <div class="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
                                    <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                    </svg>
                                    <span class="sr-only">Info</span>
                                    <div>
                                        <span class="font-medium">Information</span> {info}
                                    </div>
                                </div>)}
                            <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                                <h2 className="font-manrope font-bold text-3xl leading-10">Panier</h2>
                                <h2 className="font-manrope font-bold text-3xl leading-10">{carts.length} élement{carts.length > 1 ? "s" : ""}</h2>
                            </div>
                            <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                                <div className="col-span-12 md:col-span-7">
                                    <p className="font-normal text-lg leading-8 text-gray-400">Détails du produit</p>
                                </div>
                                <div className="col-span-12 md:col-span-5">
                                    <div className="grid grid-cols-5">
                                        <div className="col-span-3">
                                            <p className="font-normal text-lg leading-8 text-gray-400 text-center">Quantité</p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="font-normal text-lg leading-8 text-gray-400 text-center">Total</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {carts?.map(cart => (
                                <div
                                    key={cart?.id}
                                    className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6 border-b border-gray-200">
                                    <div className="w-full md:max-w-[126px]">
                                        <img src={cart?.images[0]} alt="perfume bottle"
                                            className="mx-auto" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                                        <div className="md:col-span-2">
                                            <div className="flex flex-col max-[500px]:items-center gap-3">
                                                <h6 className={`font-semibold text-base leading-7 ${cart?.quantity === 0 && "line-through"}`}>{cart?.title}</h6>
                                                <h6 className={`font-normal text-base leading-7 text-gray-500 ${cart?.quantity === 0 && "line-through"}`} >{cart?.description}</h6>
                                            </div>
                                        </div>
                                        <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                                            <div className="relative md:ml-7 lg:ml-9 mt-2 flex items-center max-w-[7rem]">
                                                <button
                                                    type="button"
                                                    id="decrement-button"
                                                    data-input-counter-decrement="quantity-input"
                                                    className={`${cart?.quantity === 0 && "cursor-not-allowed"} bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-700 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:outline-none`}
                                                    disabled={cart?.quantity === 0}
                                                    onClick={() => {
                                                        if (cart.quantity > 0) {
                                                            const existingProductIndex = carts.findIndex(item => item.id === cart.id);
                                                            if (existingProductIndex !== -1) {
                                                                const updatedCarts = [...carts];
                                                                const existingProduct = updatedCarts[existingProductIndex];
                                                                existingProduct.quantity -= 1;
                                                                updatedCarts[existingProductIndex] = existingProduct;
                                                                setCarts(updatedCarts);
                                                            }
                                                        }
                                                    }}
                                                >
                                                    <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                                    </svg>
                                                </button>
                                                <input
                                                    type="number"
                                                    id="quantity-input"
                                                    data-input-counter
                                                    aria-describedby="helper-text-explanation"
                                                    className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="1"
                                                    required
                                                    name='quantity'
                                                    value={cart.quantity}
                                                    disabled
                                                />
                                                <button
                                                    type="button"
                                                    id="increment-button"
                                                    data-input-counter-increment="quantity-input"
                                                    className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-700 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:outline-none"
                                                    onClick={() => {
                                                        const existingProductIndex = carts.findIndex(item => item.id === cart.id);
                                                        if (existingProductIndex !== -1) {
                                                            const updatedCarts = [...carts];
                                                            const existingProduct = updatedCarts[existingProductIndex];
                                                            existingProduct.quantity += 1;
                                                            updatedCarts[existingProductIndex] = existingProduct;
                                                            setCarts(updatedCarts);
                                                        }
                                                    }}
                                                >
                                                    <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                                            <p className="font-bold text-lg leading-8 text-indigo-600 text-left">{cart?.price * cart?.quantity}€</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div
                            className="col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
                            <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-8">
                                Récapitulatif de la commande</h2>
                            <div className="mt-8">
                                <form onSubmit={submitPayment}>
                                    <label className="flex items-center mb-1.5 text-gray-600 text-sm font-medium">Shipping
                                    </label>
                                    <div className="flex pb-6">
                                        <div className="relative w-full">
                                            <div className=" absolute left-0 top-0 py-3 px-4">
                                                <span className="font-normal text-base text-gray-300">Deuxième livraison</span>
                                            </div>
                                            <input type="text"
                                                className="block w-full h-11 pr-10 pl-36 min-[500px]:pl-52 py-2.5 text-base font-normal shadow-xs bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-gray-400"
                                                placeholder="$5.00" />
                                            <button id="dropdown-button" data-target="dropdown-delivery"
                                                className="dropdown-toggle flex-shrink-0 z-10 inline-flex items-center py-4 px-4 text-base font-medium text-center bg-transparent  absolute right-0 top-0 pl-2 "
                                                type="button">
                                                <svg className="ml-2 my-auto" width="12" height="7" viewBox="0 0 12 7"
                                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M1 1.5L4.58578 5.08578C5.25245 5.75245 5.58579 6.08579 6 6.08579C6.41421 6.08579 6.74755 5.75245 7.41421 5.08579L11 1.5"
                                                        stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"
                                                        strokeLinejoin="round"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <label className="flex items-center mb-1.5 text-gray-400 text-sm font-medium">Promo Code
                                    </label>
                                    <div className="flex pb-4 w-full">
                                        <div className="relative w-full ">
                                            <div className=" absolute left-0 top-0 py-2.5 px-4 text-gray-300">

                                            </div>
                                            <input type="text"
                                                className="block w-full h-11 pr-11 pl-5 py-2.5 font-normal shadow-xs bg-white border border-gray-300 rounded-lg "
                                                placeholder="xxxx xxxx xxxx" />
                                            <button id="dropdown-button" data-target="dropdown"
                                                className="dropdown-toggle flex-shrink-0 z-10 inline-flex items-center py-4 px-4 text-base font-medium text-center bg-transparent  absolute right-0 top-0 pl-2 "
                                                type="button"><svg className="ml-2 my-auto" width="12" height="7" viewBox="0 0 12 7"
                                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M1 1.5L4.58578 5.08578C5.25245 5.75245 5.58579 6.08579 6 6.08579C6.41421 6.08579 6.74755 5.75245 7.41421 5.08579L11 1.5"
                                                        stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"
                                                        strokeLinejoin="round"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center border-b border-gray-200">
                                        <button
                                            className="rounded-full w-full bg-black py-3 px-4 text-white text-sm font-semibold text-center mb-8 transition-all duration-500 hover:bg-black/80"
                                            type="button"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between py-8">
                                        <p className="font-medium text-black text-xl leading-8">{carts?.length} élement{carts?.length > 1 ? "s" : ""} </p>
                                        <p className="font-semibold text-xl leading-8 text-indigo-600">{total}€</p>
                                    </div>
                                    <Button
                                        className="w-full text-center bg-indigo-600 rounded-full font-semibold text-lg text-white transition-all duration-500 hover:bg-indigo-700 focus:ring-0"
                                        type="submit"
                                        isProcessing={isLoading}
                                        processingSpinner={<AiOutlineLoading className="h-6 w-6 animate-spin" />}
                                        disabled={carts?.length === 1}
                                    >
                                        Payer
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}