function Functions() {

};

Functions.addSVGGroup = function(svg, id) {
    var g = document.createElement('g');
    g.id = id;
    svg.appendChild(g);
};

Functions.listenToPostMessages = function(cb, svg, context) {
    window.addEventListener("message", function(event) {
        cb(svg, event);
        window.parent.GLOBALS.return_value = true;
    });
    return true;
};

Functions.markersInitialize = function(world_svg) {
    return Functions.listenToPostMessages(function(svg, event) {
        if(event.data.type == "create_marker") {
            const { opacity, radius } = event.data;
            let marker = new window.Marker(svg, {opacity: opacity, radius: radius});
            const {x, y, color, Dest} = event.data;
            marker.placeMarker(x, y, color, Dest);
            markers[color] = marker;
            window.parent.PostMessage(JSON.stringify({}), null);
        } else if(event.data.type == "clear_markers") {
            Object.keys(markers).forEach((value, index) => {
                value.removeMarker(index);
            });
            markers = {};
        }
        else if(event.data.type == "remove_marker") {
            markers[event.data.color].removeMarker();
            delete markers[event.data.color];
        } else if(event.data.type == "touch_marker") {
            const { pageX, pageY } = event.data;
            var colors = [];
            for(var color in markers) {
                if(markers[color].isPointInside(pageX, pageY)) {
                    colors.push(color);
                }
            }
            var object = {
                colors: colors
            };
            if(colors.length && window.parent.GLOBALS.mobile == false) {
                window.parent.PostMessage(JSON.stringify(object), null);
            } else {
                window.ReactNativeWebView.postMessage(JSON.stringify(object), "*");
            }
        }
    }, world_svg);
};

Functions.wheelInitialize = function(world_svg) {
    return Functions.listenToPostMessages(function(svg, event) {
        if(event.data.type == "create_wheel") {
            let wheel = new window.ColorWheel(svg, { sectors: event.data.sectors });
            for(var i = 0; i < event.data.sectors; i++) {
                wheel.createSector(event.data.colors[i], i);
            }
        }
    }, world_svg);
};

// PostMessage Wrapper for iframe window
window.PostMessage = function(object, callback) {
    var promise = new Promise(function(resolve) {
        window.postMessage(object, "*");
        // resolve the callback function
        setInterval(function() {
            if(window.parent.GLOBALS.return_value) {
                resolve(true);
                window.parent.GLOBALS.return_value = false;
            }
        }, 100);
    });
    // register promise
    if(callback) {
        promise.then(callback);
    }

    return promise;
};

module.exports = Functions;