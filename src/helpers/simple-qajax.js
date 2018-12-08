import Q from "q"

export default {
    execute : function (configObject) {
        let method = configObject.method || "GET";
        let deferred = Q.defer();
        let req = new XMLHttpRequest();
        let postData = configObject.postData;
        req.open(method, configObject.URL);
        if (method == "POST") {
            req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        } else {
            req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    deferred.resolve({
                        responseText : req.responseText,
                        status : req.status
                    });
                } else {
                    deferred.reject({
                        status : req.status
                    });
                }
            }
        };
        
        
        req.send(postData);
        
        return deferred.promise;
    }
}