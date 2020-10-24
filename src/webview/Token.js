function Token() {

    function constructor(paper, props) {
        this.paper = paper;
        this.props = props;
        this.token = {};
        return this;
    }

    return constructor.apply(this, arguments);

};

Token.prototype = {
    placeToken: function(x, y, variation) {
        this.token[variation] = this.paper.image('../assets/img/airplane-token-' + color + '.png', x, y, 15, 15);
    },

    removeToken: function(variation) {
        this.token[variation].remove();
    }
}

module.exports = Token;