function Sunscreen() {

    function constructor(paper, props) {
        this.paper = paper;
        this.props = props;
        this.screen = paper.rect(200, 0, 250, window.innerHeight)
            .attr({
                fill: 'yellow',
                stroke: '#ffffff',
                strokeWidth: 2,
                opacity: props.opacity
            });
        this.text = {};
        this.sectors = props.sectors;
        this.sector = {};
        return this;
    }

    return constructor.apply(this, arguments);

}

Sunscreen.prototype = {
    MOVEMENT: 0.05,
    INTERVAL: 100,

    moveScreen: function() {
        var instance = this;
        this.interval = window.setInterval(function() {
            instance.screen.attr('x', instance.screen.attr('x') - Sunscreen.prototype.MOVEMENT);
        }, Sunscreen.prototype.INTERVAL);
    },

    clearScreen: function() {
        window.clearInterval(this.interval);
    }

};

module.exports = Sunscreen;