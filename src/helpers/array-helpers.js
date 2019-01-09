export default {
    shuffle : function(arr) {
        let rounds = arr.length;
        for (let i = 0; i < rounds; i++) {
            let m = this.getRandomInt(0, arr.length);
            let n = this.getRandomInt(0, arr.length);
            this.swap(arr, m, n);
        }
    },
    shuffleReactive : function(vueInstance, arr) {
        let rounds = arr.length;
        for (let i = 0; i < rounds; i++) {
            let m = this.getRandomInt(0, arr.length);
            let n = this.getRandomInt(0, arr.length);
            this.swapReactive(vueInstance, arr, m, n);
        }
    },
    getRandomInt : function(min, max) {
        return min + Math.floor(Math.random() * Math.floor(max - min));
    },
    swap : function(arr, left, right) {
        let placeholder = arr[left];
        arr[left] = arr[right];
        arr[right] = placeholder;
    },
    swapReactive : function(vueInstance, arr, left, right) {
        let placeholder = arr[left];
        vueInstance.$set(arr, left, arr[right]);
        vueInstance.$set(arr, right, placeholder);
    }
};
