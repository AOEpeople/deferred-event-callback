"use strict";

export default (timeoutValue, callback) => {
    if (window.attachEvent) {
        window.attachEvent('onresize', () => {
            executeCallbackDeferred();
        });
    } else if (window.addEventListener) {
        window.addEventListener('resize', () => {
            executeCallbackDeferred();
        }, true);
    }

    var id;
    function executeCallbackDeferred() {
        clearTimeout(id);
        id = setTimeout(callback, timeoutValue);
    }
}