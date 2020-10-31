import React, { Component } from 'react';
import AnimFrame from '../../tests/App/public/components/AnimFrame';
import { throttle } from 'lodash';

class Sunscreen extends AnimFrame {

    MOVEMENT = 0.05;
    RUN_TIME = 100000;
    SCREEN_COLOR = 'yellow';
    animation = null;
    SCREEN_STROKE = '#ffffff';
    SCREEN_STROKEWIDTH = 2;

    state = {
        position: 0,
        offset: this.MOVEMENT,
        iter: 0
    }

    constructor(props) {
        super(props);
        this.paper = props.paper;
        this.screen = this.paper.rect(this.props.position, 0, 250, window.innerHeight)
            .attr({
                fill: this.SCREEN_COLOR,
                stroke: this.SCREEN_STROKE,
                strokeWidth: this.SCREEN_STROKEWIDTH,
                opacity: props.opacity
            });
        this.text = {};
        this.registerEvent = this.registerEvent.bind(this);
        this.attachEvent = this.attachEvent.bind(this);
        this.startAnimation = this.startAnimation.bind(this);
        this.moveScreen = this.moveScreen.bind(this);
        this.runAnimation = this.runAnimation.bind(this);
        this.callAttachedEvents = this.callAttachedEvents.bind(this);
        this.registerEvent("sunscreen");
        this.attachEvent("sunscreen", this.moveScreen, null);
        this.startAnimation("sunscreen");
    }

    moveScreen() {
        var instance = arguments[arguments.length - 1];
        instance.screen.attr('x', instance.screen.attr('x') - instance.state['offset']);
    }

    startAnimation(type) {
        this.animation = window.requestAnimationFrame(this.runAnimation);
    }

    runAnimation() {
        this.callAttachedEvents("sunscreen");
        if(this.state['position'] < this.RUN_TIME) {
            this.setState({
                position: this.state['position'] + 1
            });
            window.requestAnimationFrame(this.runAnimation);
        }
    }

    render() {
        return "Running Animation...";
    }

}

export default Sunscreen;
