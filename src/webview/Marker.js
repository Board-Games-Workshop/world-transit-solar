function Marker() {

    function constructor(paper, props) {
        this.paper = paper;
        this.props = props;
        this.circle = {};
        this.text = {};
        const {opacity, radius} = props;
        if(!opacity) {
            this.opacity = 0.6;
        } else {
            this.opacity = opacity;
        }
        if(!radius) {
            this.radius = 10;
        } else {
            this.radius = radius;
        }
        return this;
    }

    return constructor.apply(this, arguments);

}

Marker.prototype = {
    placeMarker: function(x, y, color, Dest) {
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
    }
}

module.exports = Marker;