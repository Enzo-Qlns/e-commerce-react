import Utils from "../utils/Utils";
import { HOST } from "./constants";
import http from "./http";

const productService = {
    get_products(offset, limit, onResponse = undefined) {
        const options = http.defaultOptions();
        if (Utils.isEmpty(offset, limit)) {
            return http.call(HOST + "/products", options, onResponse);
        } else {
            return http.call(HOST + "/products?offset=" + offset + "&limit=" + limit, options, onResponse);
        }
    },
}
export default productService;