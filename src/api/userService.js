import { HOST } from "./constants";
import http from "./http";

const userService = {
    update_profile(id, name, email, avatar, onResponse = undefined) {
        const options = http.defaultOptions();
        options.method = 'PUT';
        options.body = JSON.stringify({ 'name': name, "email": email, "avatar": avatar });
        return http.call(HOST + "/users/" + id, options, onResponse);
    },
    update_avatar(id, avatar, onResponse = undefined) {
        const options = http.defaultOptions();
        options.method = 'PUT';
        options.body = JSON.stringify({ 'avatar': avatar });
        return http.call(HOST + "/users/" + id, options, onResponse);
    }
}
export default userService;