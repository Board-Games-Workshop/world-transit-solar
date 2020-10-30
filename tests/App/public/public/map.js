window.addEventListener("message", function(event) {
    window.removeEventListener("message");
    var iframe = document.getElementsByTagName("iframe")[0];
    var type = event.data.type;
    iframe.contentWindow.GLOBALS.return_value = true;
});

// PostMessage Wrapper for External Environment
window.PostMessage = function(object, callback) {
    var iframe = document.getElementsByTagName("iframe")[0];
    var promise = new Promise(function(resolve) {
        window.postMessage(object, "*");
        // resolve the callback function
        setInterval(function() {
            if(iframe.contentWindow.GLOBALS.return_value) {
                iframe.contentWindow.GLOBALS.return_value = false;
                resolve(true);
            }
        }, 100);
    });
    // register promise
    if(callback) {
        promise.then(callback);
    }

    return promise;
};