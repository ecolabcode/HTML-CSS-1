// Polyfill para NodeList.prototype.forEach
if (!NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function(callback, thisArg) {
        Array.prototype.forEach.call(this, callback, thisArg);
    }
}
