import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react'
import { useProgressBar } from "../../../provider/ProgressBarProvider";
import productService from "../../../api/productService";
import { toast } from "react-toastify";
import QuickPreview from "../../../components/home/QuickPreview";

export default function ArticleQuickView() {
    const [product, setProducts] = useState(null);
    const [displayQuickPreview, setDisplayQuickPreview] = useState(false);
    const { displayProgressBar } = useProgressBar();
    const { id } = useParams();

    const fetchProduct = () => {
        productService.get_one_product(id, (statusCode, jsonRes) => {
            displayProgressBar(false);

            if (200 === statusCode) {
                setProducts(jsonRes);
                setDisplayQuickPreview(true);
            } else {
                toast.error("Une erreur est survenue, veuillez réessayer ultérieure");
            };
        });
    }

    useEffect(() => {
        fetchProduct();
        // eslint-disable-next-line
    }, [id]);

    return (
        <div>
            {/* QuickPreview */}
            <QuickPreview
                open={displayQuickPreview}
                setOpen={setDisplayQuickPreview}
                product={product}
            />
            {/* End QuickPreview */}
        </div>
    )
}