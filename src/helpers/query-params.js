export default {
    get () {
        let queryParamsObj = new URLSearchParams(window.location.search);
        let keysItr = queryParamsObj.keys();
        let k;
        let qparams = {};

        do {
            k = keysItr.next();
            if (!k.done) {
                qparams[k.value] = queryParamsObj.get(k.value)
            }
        } while (!k.done)
        return qparams;
    }
}