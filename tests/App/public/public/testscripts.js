eval(module.exports["START_MARKERS"]);

/** create marker */
window.PostMessage(
    module.exports["CONTEXT"].CREATE_MARKER(200, 200, {'Hex': '#a456fdr', 'Dest': 'Calgary'}), 
    function() {
        /** touch marker */
        window.PostMessage(module.exports["CONTEXT"].TOUCH_MARKER(200, 200), function() {});
    }
);