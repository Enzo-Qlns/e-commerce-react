import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Badge, Carousel } from "flowbite-react";
import { Button } from "flowbite-react";
import { HiAdjustments, HiMinusCircle, HiOutlinePlusCircle, HiCloudDownload, HiUserCircle } from "react-icons/hi";


export default function QuickPreview({
    product,
    open,
    onClose,
    onAddCarts,
}) {
    const [quantity, setQuantity] = useState(1)

    const submit = (e) => {
        const data = new FormData(e.currentTarget);
        e.preventDefault()

        product["quantity"] = Number.parseInt(data.get('quantity'))
        onAddCarts(product);
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                            enterTo="opacity-100 translate-y-0 md:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 md:scale-100"
                            leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                        >
                            <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                                    <button
                                        type="button"
                                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                                        onClick={onClose}
                                    >
                                        <span className="sr-only">Close</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>

                                    <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                                        <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                                            <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                                                <Carousel slide={false}>
                                                    {product?.images.map((elt, i) => (
                                                        <img key={i} src={elt} alt={"image de " + product.title} />
                                                    ))}
                                                </Carousel>
                                            </div>
                                        </div>
                                        <div className="sm:col-span-8 lg:col-span-7">
                                            <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{product.title}</h2>

                                            <section aria-labelledby="information-heading" className="mt-2">
                                                <h3 id="information-heading" className="sr-only">
                                                    Product information
                                                </h3>

                                                <p className="text-2xl text-gray-900">{product.price}€</p>
                                            </section>

                                            <section aria-labelledby="options-heading" className="mt-10">
                                                <h3 id="options-heading" className="sr-only">
                                                    Product options
                                                </h3>

                                                <form onSubmit={submit} className='flex flex-col justify-between'>
                                                    {/* Colors */}
                                                    <div>
                                                        <h4 className="text-sm font-medium text-gray-900">Catégories</h4>
                                                        {typeof product?.category === "object"
                                                            ? <Badge className='w-fit mt-2' size={"lg"} color="info">{product?.category?.name}</Badge>
                                                            : product?.category.map(elt => (
                                                                <Badge key={elt.id} className='w-fit mt-2' size={"lg"} color="info">{elt.name}</Badge>
                                                            ))}
                                                    </div>

                                                    {/* Quantité */}
                                                    <div className='mt-3'>
                                                        <h4 className="text-sm font-medium text-gray-900">Quantité</h4>
                                                        <div className="relative mt-2 flex items-center max-w-[8rem]">
                                                            <button
                                                                type="button"
                                                                id="decrement-button"
                                                                data-input-counter-decrement="quantity-input"
                                                                className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:outline-none"
                                                                onClick={() => {
                                                                    if (quantity > 1) setQuantity(quantity - 1)
                                                                }}
                                                            >
                                                                <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                                                </svg>
                                                            </button>
                                                            <input
                                                                value={quantity}
                                                                onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
                                                                type="number"
                                                                id="quantity-input"
                                                                data-input-counter
                                                                aria-describedby="helper-text-explanation"
                                                                className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                placeholder="1"
                                                                required
                                                                name='quantity'
                                                            />
                                                            <button
                                                                type="button"
                                                                id="increment-button"
                                                                data-input-counter-increment="quantity-input"
                                                                className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:outline-none"
                                                                onClick={() => setQuantity(quantity + 1)}
                                                            >
                                                                <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <button
                                                        type="submit"
                                                        className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent focus:border-transparent focus:ring-0 bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                    // onClick={onAddCarts}
                                                    >
                                                        Ajouter au panier
                                                    </button>
                                                </form>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div >
            </Dialog >
        </Transition.Root >
    )
}
