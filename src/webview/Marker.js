function Marker() {

    function constructor(paper, props) {
        this.paper = paper;
        this.props = props;
        this.circle = {};
        this.ring = {};
        this.text = {};
        this.positions = {};
        this.interval = null;
        const { opacity, radius } = props;
        if(!opacity) {
            this.opacity = Marker.prototype.OPACITY;
        } else {
            this.opacity = opacity;
        }
        if(!radius) {
            this.radius = Marker.prototype.RADIUS;
        } else {
            this.radius = radius;
        }
        return this;
    }

    return constructor.apply(this, arguments);

}

Marker.prototype = {
    OPACITY: 0.4,
    RADIUS: 10,

    placeMarker: function(x, y, color, Dest) {
        this.positions[color] = {'x': x, 'y': y};
        this.circle[color] = this.paper.circle(x, y, this.radius)
            .attr({fill: color, opacity: this.opacity});
        this.text[color] = this.paper.text(x + this.offset(), y - this.offset(), Dest)
            .attr({fontSize: '13px', fill: '#000', stroke: '#000'});
    },

    removeMarker: function(color) {
        this.circle[color].remove();
        this.text[color].remove();
    },

    offset: function() {
        return 3;
    },

    isPointInside: function(x, y) {
        let cx = null, cy = null, present = false;
        for (var color in this.circle) {
            cx = parseFloat(this.circle[color].attr('cx'));
            cy = parseFloat(this.circle[color].attr('cy'));
            if(Math.sqrt(Math.pow(cx - x, 2) + Math.pow(cy - y, 2)) <= this.radius) {
                present = true;
                break;
            }
        }
        return present;
    },

    animateMarker: function(color) {
        var instance = this;
        this.ring[color] = this.paper.circle(this.positions[color]['x'], 
            this.positions[color]['y'], this.radius + 2)
            .attr({fill: "transparent", opacity: 1.0});
        this.interval = window.setInterval(function() {
            instance.circle[color].animate({ opacity: Marker.prototype.OPACITY }, 1500, 
                Snap.mina, function() {
                instance.circle[color].animate({ opacity: 1.0 }, 1000);
            });
        }, 1500);
    },

    clearMarker: function() {
        window.clearInterval(this.interval);
    }
};

module.exports = Marker;