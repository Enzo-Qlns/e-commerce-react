import { HOST } from "./constants";
import http from "./http"

const categorieService = {
    get_categories: (onResponse = undefined) => {
        const options = http.defaultOptions();
        return http.call(HOST + "/categories", options, onResponse);
    }
}
export default categorieService;