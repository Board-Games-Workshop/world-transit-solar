const START_MARKERS = `
var world_svg = window.Snap("#world_svg");
var markers = {};
window.Functions.markersInitialize(world_svg);
window.Functions.wheelInitialize(world_svg);
`;

module.exports = {
    "START_MARKERS": START_MARKERS
};
