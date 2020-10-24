function UMap() {

    function constructor(paper, props) {
        this.paper = paper;
        this.props = props;
        this._center = null;
        definitions.call(this);
        return this;
    }

    function definitions() {
        this.aspectRatio = { get: function() {
            return this.paper.attr('width') / this.paper.attr('height');
        }};
    
        this.responsive = {
            set: function(responsive) {
                if(responsive === true) {
        
                } else {
                    this.paper.node.removeAttribute('width');
                    this.paper.node.removeAttribute('height');
                }
            }
        }
    
        this.center = {
            get: function() { return this._center; },
            set: function(center) { this._center = center; }
        };
    }

    return constructor.apply(this, arguments);

}

UMap.prototype = {
    calculateCenter: function(x, y, w, h) {
        return [0.5*(x+w), 0.5*(y+h)];
    },

    setViewBox: function(x, y, w, h, fit) {
        this.paper.attr({viewBox: Map.getViewBox(x, y, w, h)});
        this.center = this.calculateCenter(x, y, w, h);
    },

    translateMap: function(tx, ty) {
        let [vx, vy, vw, vh] = this.paper.node.getAttribute('viewBox').split(' ');
        const {x, y} = {
            'x': vx - tx,
            'y': vy - ty
        };
        this.paper.setViewBox(x, y, vw, vh, fit);
    },

    zoomMap: function(z) {
        let [vx, vy, vw, vh] = this.paper.node.getAttribute('viewBox').split(' ');
        let [cx, cy] = this.center;
        let offset = z/Math.abs(z);
        const {x, y, w, h} = {
            'x': vx + offset*this.props.zoomParameter*z,
            'y': vy - offset*this.props.zoomParameter*z,
            'w': vw - offset*this.props.zoomParameter*z,
            'h': vh - offset*this.props.zoomParameter*z
        };
        this.paper.setViewBox(x, y, w, h, fit);
    }
};

UMap.getViewBox = function(x, y, w, h) {
    return [x.toString(), y.toString(), w.toString(), h.toString()].join(" ");
};

module.exports = UMap;