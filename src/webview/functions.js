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
                    colors.append(color);
                }
            }
            var object = {
                colors: colors
            };
            if(colors.length) {
                window.ReactNativeWebView.postMesage(JSON.stringify(object), "*");
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

module.exports = Functions;