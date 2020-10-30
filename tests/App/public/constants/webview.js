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
        pageY: pageY,
        opacity: 0.2
    };
};

CONTEXT.CREATE_MARKER = function(x, y, row) {
    return {
        'type': 'create_marker',
        'x': x,
        'y': y,
        'color': row.Hex,
        'Dest': row.Dest
    };
};

module.exports = {
    "START_MARKERS": START_MARKERS,
    "CONTEXT": CONTEXT
};
