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
        let cx = parseFloat(this.circle.attr('cx'));
        let cy = parseFloat(this.circle.attr('cy'));
        return Math.sqrt(Math.pow(cx - x, 2) + Math.pow(cy - y, 2)) <= this.radius;
    }
}

module.exports = Marker;