eval(module.exports["START_MARKERS"]);

/** create marker */
window.postMessage(module.exports["CONTEXT"].CREATE_MARKER(200, 200, {'Hex': '#a456fdr', 'Dest': 'Calgary'}));

/** touch marker */
window.postMessage(module.exports["CONTEXT"].TOUCH_MARKER(200,200));

alert(window.parent.GLOBALS.mobile);