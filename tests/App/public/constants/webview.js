const START_MARKERS = `
var world_svg = window.Snap("#world_svg");
var markers = {};
window.Functions.markersInitialize(world_svg);
window.Functions.wheelInitialize(world_svg);
`;

CONTEXT = {};

CONTEXT.TOUCH_MARKER = function(pageX, pageY) {
    return {
        type: 'touch_marker',
        pageX: pageX,
        pageY: pageY
    };
}

module.exports = {
    "START_MARKERS": START_MARKERS,
    "CONTEXT": CONTEXT
};
