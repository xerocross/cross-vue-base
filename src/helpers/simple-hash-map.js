let SetBuilder = {
    
    build : function(slots) {
        let set = {};
        let hashContainer = [];
        for (let i = 0; i < slots; i++) {
            hashContainer[i] = [];
        }

        let hashFunction = function(str) {
            var hash = 0, i, chr;
            if (str.length === 0) return hash;
            for (i = 0; i < str.length; i++) {
                chr   = str.charCodeAt(i);
                hash  = ((hash << 5) - hash) + chr;
                hash |= 0; // Convert to 32bit integer
            }
            hash = hash % slots;
            while (hash < 0) {
                hash += slots;
            }
            return hash % slots;
        }

        set.add = function(key, val) {
            let item = set.get(key);
            if (item != null) {
                item.value = val;
            } else {
                let hash = hashFunction(key);

                hashContainer[hash].push({
                    key : key,
                    value : val
                });
            }
        }

        set.get = function(key) {
            let hash = hashFunction(key);
            if (hashContainer[hash] == undefined) {
                return false;
            } else {
                let arr = hashContainer[hash];
                for (let i = 0; i < arr.length; i ++) {
                    if (arr[i].key == key) {
                        return arr[i];
                    }
                }
                return null;
            }
        }

        set.contains = function(someItem) {
            let hash = hashFunction(someItem);
            if (hashContainer[hash] == undefined) {
                return false;
            } else {
                let arr = hashContainer[hash];
                for (let i = 0; i < arr.length; i ++) {
                    if (arr[i].key == someItem) {
                        return true;
                    }
                }
                return false;
            }
        }
        set.getValue = function(key) {
            let hash = hashFunction(key);
            if (hashContainer[hash] == undefined) {
                return false;
            } else {
                let arr = hashContainer[hash];
                for (let i = 0; i < arr.length; i ++) {
                    if (arr[i].key == key) {
                        return arr[i].value;
                    }
                }
                return false;
            }
        }

        set.remove = function(key) {
            let hash = hashFunction(key);
            if (hashContainer[hash] == undefined) {
                return true;
            } else {
                let arr = hashContainer[hash];
                let newArray = [];
                for (let i = 0; i < arr.length; i ++) {
                    if (arr[i].key != key) {
                        newArray.push(arr[i]);
                    }
                }
                hashContainer[hash] = newArray;
            }
        }

        set.toList = function() {
            let list = [];
            for (let i = 0; i < hashContainer.length; i++) {
                let slot = hashContainer[i];
                for (let j = 0; j < slot.length; j++) {
                    list.push(slot[j]);
                }
            }
            return list;
        }

        return set;
    }
}




export default SetBuilder;