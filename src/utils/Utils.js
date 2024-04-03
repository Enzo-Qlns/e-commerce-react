const Utils = {
    isEmpty(...values) {
        if (values.length === 0)
            return true;
        for (let index = 0; index < values.length; index++) {
            const value = values[index];
            const isArray = Array.isArray(value);
            let bool = (undefined === value || "" === value || " " === value || null === value || (isArray && value.length === 0) || (typeof value === 'string' && value.length === 0));
            if (bool)
                return true;
        }
        return false;
    },
    objSize(obj, size = 0, key = undefined) {
        for (key in obj)
            if (obj.hasOwnProperty(key))
                size++;
        return size;
    },
    boolToValue(value) {
        return value ? 'OUI' : 'NON';
    },
    encodeBase64(value) {
        return btoa(value);
    },
    decodeBase64(value) {
        return atob(value);
    },
    convertChart(str) {
        let c = {
            '&lt;': '&amp;lt;', '&gt;': '&amp;gt;', '&': '&amp;amp;',
            '"': '&amp;quot;', "'": '&amp;#039;', '#': '&amp;#035;'
        };

        return str.replace(/[&lt;&amp;>'"#]/g, function (s) { return c[s]; });
    },
    capitalizeFirstLetter(word) {
        return word.charAt(0).toUpperCase() + word.slice(1)
    },
    isOnPhone() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    },
    // Fonction pour ajouter des paramètres de requête à l'URL actuelle
    addQueryParam(pathname, key, value) {
        const location = window.location;
        const searchParams = new URLSearchParams(location.search);
        searchParams.set(key, value);
        const newSearch = searchParams.toString();
        return `${pathname}?${newSearch}`;
    },
    removeDuplicatesCategories(arr) {
        const seen = new Set();
        return arr.filter(obj => {
            const key = obj.name;
            if (seen.has(key)) {
                return false;
            }
            seen.add(key);
            return true;
        });
    },
    async getUserInfo() {
        return new Promise(async (resolve, reject) => {
            const userInfo = {};

            // Obtenir le navigateur de l'utilisateur
            userInfo.browser = window.navigator.userAgent;

            // Obtenir l'adresse IP de l'utilisateur en utilisant un service tiers
            try {
                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();
                userInfo.ipAddress = data.ip;
            } catch (error) {
                console.error('Erreur lors de la récupération de l\'adresse IP :', error);
                reject();
            }

            // Obtenir la géolocalisation de l'utilisateur en utilisant l'API HTML5
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition((position) => {
                    userInfo.latitude = position.coords.latitude.toString();
                    userInfo.longitude = position.coords.longitude.toString();
                    resolve(userInfo);
                }, (error) => {
                    console.error('Erreur lors de la récupération de la géolocalisation :', error);
                    reject();
                });
            } else {
                console.error('La géolocalisation n\'est pas prise en charge par ce navigateur.');
                reject();
            }
        });
    }
};
export default Utils;