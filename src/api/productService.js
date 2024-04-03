import Utils from "../utils/Utils";
import { HOST } from "./constants";
import http from "./http";

const productService = {
    get_products(query, onResponse = undefined) {
        const options = http.defaultOptions();
        if (Utils.isEmpty(query)) {
            return http.call(HOST + "/products", options, onResponse);
        } else {
            return http.call(HOST + "/products"+query, options, onResponse);
        }
    },
    get_one_product(id, onResponse = undefined) {
        const options = http.defaultOptions();
        return http.call(HOST + "/products/" + id, options, onResponse);
    },
}
export default productService;