// Polyfill para NodeList.prototype.forEach
if (!NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function(callback, thisArg) {
        Array.prototype.forEach.call(this, callback, thisArg);
    }
}

// Polyfill para Element.prototype.addEventListener
(function() {
    if (!Element.prototype.addEventListener) {
        let eventListeners = [];

        let addEventListener = function(type, listener /*, useCapture (will be ignored) */) {
            let self = this;
            let wrapper = function(e) {
                e.target = e.srcElement;
                e.currentTarget = self;

                if (listener.handleEvent) {
                    listener.handleEvent(e);
                } else {
                    listener.call(self, e);
                }
            };

            if (type === "DOMContentLoaded") {
                let wrapper2 = function(e) {
                    if (document.readyState === "complete") {
                        wrapper(e);
                    }
                };

                if (document.attachEvent) {
                    document.attachEvent("onreadystatechange", wrapper2);
                }

                eventListeners.push({ object: this, type: type, listener: listener, wrapper: wrapper2 });

                if (document.readyState === "complete") {
                    let e = new Event();
                    e.target = window;
                    wrapper2(e);
                }
            } else {
                this.attachEvent("on" + type, wrapper);
                eventListeners.push({ object: this, type: type, listener: listener, wrapper: wrapper });
            }
        };

        let removeEventListener = function(type, listener /*, useCapture (will be ignored) */) {
            let counter = 0;

            while (counter < eventListeners.length) {
                let eventListener = eventListeners[counter];

                if (eventListener.object === this && eventListener.type === type && eventListener.listener === listener) {
                    if (type === "DOMContentLoaded") {
                        this.detachEvent("onreadystatechange", eventListener.wrapper);
                    } else {
                        this.detachEvent("on" + type, eventListener.wrapper);
                    }
                    eventListeners.splice(counter, 1);
                    break;
                }
                ++counter;
            }
        };

        Element.prototype.addEventListener = addEventListener;
        Element.prototype.removeEventListener = removeEventListener;
        if (Document) {
            Document.prototype.addEventListener = addEventListener;
            Document.prototype.removeEventListener = removeEventListener;
        }
        if (Window) {
            Window.prototype.addEventListener = addEventListener;
            Window.prototype.removeEventListener = removeEventListener;
        }
    }
})();
