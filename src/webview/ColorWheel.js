function Colorwheel() {

    function constructor(paper, props) {
        this.paper = paper;
        this.props = props;
        this.circle = paper.circle(200, 800, 75).attr({stroke: '#fff', fill: "#f2f2f2"});
        this.text = {};
        this.sectors = props.sectors;
        this.sector = {};
        return this;
    }

    return constructor.apply(this, arguments);

}

Colorwheel.prototype = {
    createSector: function(color, index) {
        let { rx, ry, angle } = this.radiusPoints(index);
        let next_index = index + 1;
        let radius = this.circle.attr('r');
        next_index = next_index % 20;
        const cx = this.circle.attr('cx');
        const cy = this.circle.attr('cy');
        let pathString = "M" + cx.toString() + "," + cy.toString();
        pathString += " L" + rx.toString() + "," + ry.toString();
        let result = this.radiusPoints(next_index);
        pathString += " A" + radius.toString() + "," + radius.toString() + " " + angle.toString() + " 0 0 " + result.rx.toString() + "," + result.ry.toString();
        this.sector[color] = this.paper.path(pathString).attr({fill: color, stroke: '#fff', strokeWith: '2', opacity: 0.7});
    },

    removeSector: function(color) {
        this.sector[color].remove();
    },

    radiusPoints: function(index) {
        var cx = window.parseFloat(this.circle.attr('cx')), 
        cy = window.parseFloat(this.circle.attr('cy')), 
        radius = window.parseFloat(this.circle.attr('r')),
        theta = 2 * Math.PI * index / this.sectors,
        angle = 2 * Math.PI / this.sectors;
        return { 'rx': cx + radius * Math.cos(theta), 'ry': cy - radius * Math.sin(theta), 'angle': angle };
    }
};

module.exports = Colorwheel;