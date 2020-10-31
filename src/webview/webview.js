const UMap = require('./UMap');
const Marker = require('./Marker');
const Token = require('./Token');
const Functions = require('./functions');
const Snap = require('snapsvg');
const ColorWheel = require('./ColorWheel');
import AnimFrame from '../../tests/App/public/components/AnimFrame';

var GLOBALS = {
    return_value: false,
    markers: []
};

window.UMap = UMap;
window.Marker = Marker;
window.Token = Token;
window.Functions = Functions;
window.Snap = Snap;
window.ColorWheel = ColorWheel;
window.AnimFrame = AnimFrame;
window.GLOBALS = GLOBALS;