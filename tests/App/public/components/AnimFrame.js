import React, { Component } from 'react';

class SolarAnimFrame extends Component {

    priority = 0;
    events = {};
    state = {

    }
    
    constructor(props) {
        super(props);
        this.props = props;
    }

    registerEvent(type) {
        this.events[type + "_callback"] = [];
        this.events[type + "_args"] = [];
    }

    attachEvent(type, callback, ...args) {
        this.events[type + "_callback"].push(callback);
        // instance is append to the args
        args.push(this);
        this.events[type + "_args"].push(args);
        this.priority += 1;
    }

    callAttachedEvents(type) {
        let callback = null, args = null;
        try {
            for (var cidx = 0; cidx < this.events[type + "_callback"].length; cidx++) {
                callback = this.events[type + "_callback"][cidx];
                args = this.events[type + "_args"][cidx];
                callback.apply(this, args);
            }
        } catch(e) {
            alert(e);
        }
    }

}

export default SolarAnimFrame;