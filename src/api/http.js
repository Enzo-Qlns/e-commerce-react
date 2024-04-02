import Utils from '../utils/Utils';

const http = {
    //  Génération des headers
    defaultHeaders() {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        return headers;
    },
    //  Génération des options du call (méthode, body, headers...)
    defaultOptions() {
        const options = {};
        options.method = "GET";
        options.headers = this.defaultHeaders();
        return options;
    },
    //  Appel web generic
    async call(url = undefined, options = this.defaultOptions(), onResponse = undefined) {
        try {
            //  Lancement du call REST si tout les paramètres sont présents
            if (!Utils.isEmpty(url) && !Utils.isEmpty(onResponse)) {
                //  On retourne l'ensemble de la promesse
                return await fetch(url, options).then((response) => {
                    //  On récupére la réponse serveur => on formate en JSON, avec le code http reçu
                    response.json().then(data => {
                        onResponse(response.status, data, response.headers);
                    });
                })
            }
            else if (!Utils.isEmpty(url)) //  Autrement call classique sans la couche de JSON
            {
                return await fetch(url, options);
            }
        }
        catch (err) {
            onResponse(500, err);
        }
    },
};
export default http;