import { HOST } from "./constants";
import http from "./http";

const fileService = {
    upload_file(file, onResponse = undefined) {
        const options = http.defaultOptions();
        options.method = 'POST';
        options.body = file;
        return http.call(HOST + "/files/upload", options, onResponse);
    }
}
export default fileService;