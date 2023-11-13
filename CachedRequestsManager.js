import * as utilities from "../utilities.js";
import * as serverVariables from "../serverVariables.js";
import { log } from "../log.js";
let urlCachesExpirationTime = serverVariables.get("main.repository.CacheExpirationTime");

globalThis.urlCaches = [];

export default class CachedRequestsManager {

    static add(url, content, ETag = "") {
        /* mise en cache */
        if (url != "") {
            CachedRequestsManager.clear(url)
            urlCaches.push({
                url,
                content,
                ETag,
                Expire_Time: utilities.nowInSeconds() + urlCachesExpirationTime

            });
            console.log("File data of " + url + ".json added in ????? cache");
        }
    }
    static find(url) {
        /* retourne la cache associée à l'url */
        try {
            if (url != "") {
                for (let cache of urlCaches) {
                    if (urlCaches.url == url) {
                        cache.Expire_Time = utilities.nowInSeconds() + urlCachesExpirationTime;
                        console.log("File data of " + url + ".json retreived from ?????? cache");
                        return cache.content;
                    }
                }
            }
        }
        catch (error) {
            console.log("url cache error!", error);
        }
        return null;
    }
    static clear(url) {
        /* efface la cache associée à l’url */

        // Dans la méthode de CachedRequest.clear(url), cherchez les caches qui contiennent l'url plutôt celles qui sont égales:

        for (let endpoint of CachedRequests) {
            // target all entries related to the same APIendpoint url base
            if (endpoint.url.toLowerCase().indexOf(url.toLowerCase()) > -1)
                indexToDelete.push(index);
            index++;
        }


    }
    static flushExpired() {//ne recoit pas de paramètre
        /* efface les caches expirées */
        let indexToDelete = [];
        let index = 0;
        let now = utilities.nowInSeconds();
        for (let cache of urlCaches) {
            if (cache.Expire_Time < now) {
                console.log("Cached file data of " + cache.url + ".json expired");
                indexToDelete.push(index);
            }
            index++;
        }
        utilities.deleteByIndex(urlCaches, indexToDelete);
    }
    static get(HttpContext) {
        /*
         Chercher la cache correspondant à l'url de la requête. Si trouvé,
         Envoyer la réponse avec
         HttpContext.response.JSON( paylod, ETag, false /* from cache) // ajouter dans la cache si la requête est de type API et que le id est non défini.
         */
        if(HttpContext.urlCaches.url != ""){

        }
    }


}