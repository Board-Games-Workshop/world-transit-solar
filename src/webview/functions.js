import React from 'react';
import ReactDOM from 'react-dom';
import { animation } from 'snapsvg';
import Sunscreen from './Sunscreen';

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
        var data = {'type': event.data.type};
        if(event.data.type == "create_marker") {
            const { opacity, radius } = event.data;
            let marker = new window.Marker(svg, {opacity: opacity, radius: radius});
            const {x, y, color, Dest} = event.data;
            marker.placeMarker(x, y, color, Dest);
            window.GLOBALS.markers[color] = marker;
        } else if(event.data.type == "clear_markers") {
            Object.keys(window.GLOBALS.markers).forEach((value, index) => {
                value.removeMarker(index);
            });
            window.GLOBALS.markers = {};
        } else if(event.data.type == "remove_marker") {
            window.GLOBALS.markers[event.data.color].removeMarker();
            delete window.GLOBALS.markers[event.data.color];
        } else if(event.data.type == "touch_marker") {
            const { pageX, pageY } = event.data;
            const { opacity } = event.data;
            var colors = [];
            for(var color in window.GLOBALS.markers) {
                if(window.GLOBALS.markers[color].isPointInside(pageX, pageY)) {
                    colors.push(color);
                }
            }
            data['colors'] = colors;
            for(var color in window.GLOBALS.markers) {
                window.GLOBALS.markers[color].animateMarker(color);
            }
            const sunscreen = <Sunscreen paper={svg} opacity={opacity} position={200} />;
            ReactDOM.render( sunscreen, document.getElementById("root") );
        }
        if(typeof(event.data.type) != "undefined" && window.parent.GLOBALS.mobile == false) {
            window.parent.PostMessage(data, function(){});
        } else {
            window.ReactNativeWebView.postMessage(data);
        }
    }, world_svg);
};

Functions.wheelInitialize = function(world_svg) {
    return Functions.listenToPostMessages(function(svg, event) {
        var data = {'type': event.data.type};
        if(event.data.type == "create_wheel") {
            let wheel = new window.ColorWheel(svg, { sectors: event.data.sectors });
            for(var i = 0; i < event.data.sectors; i++) {
                wheel.createSector(event.data.colors[i], i);
            }
        }
        if(typeof(event.data.type) != "undefined" && window.parent.GLOBALS.mobile == false) {
            window.parent.PostMessage(data, function(){});
        } else {
            window.ReactNativeWebView.postMessage(data);
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
                window.parent.GLOBALS.return_value = false;
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

module.exports = Functions;