import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-community/async-storage';
import { ScreenOrientation } from 'expo';
const process = require('process');
import { START_MARKERS, CONTEXT } from '../../tests/App/public/constants/webview';

export default class Map extends Component {

    webView = null;
    fileURI = "";
    jsURI = "";
    sourceJS = "";
    map = null;

    constructor(props) {
        super(props);
    }

    state = {
        loadHtml: false,
        component: false
    };

    async changeScreenOrientation() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    }

    onMessageEvents(data) {
        const { colors } = data;
        this.props.GameController.sidebar.setState({
            colors: colors
        });
    }

    colorWheel() {
        let colors = this.props.GameController.props.BoardScale.getMarkerColours;
        let object = {
            'type': 'create_wheel',
            'colors': colors,
            'sectors': colors.length
        };
        this.injectBasicToWebView(object);
    }

    downloadJS() {
        let controller = this;
        FileSystem.readAsStringAsync(this.jsURI).then(function(sourceJS) {
            controller.sourceJS = sourceJS;
            let code = `
            ${sourceJS}
            true;
            `;
            controller.injectRawToWebView(code);

            let runCode = `
            ${START_MARKERS}
            true;
            `;
            controller.injectRawToWebView(runCode);
            controller.props.GameController.requiredData();
            controller.colorWheel();
        });
    }

    touchMap(event) {
        const {pageX, pageY} = event;
        let object = CONTEXT.TOUCH_MARKER(pageX, pageY);
        this.injectBasicToWebView(object);
    }

    injectBasicToWebView(object) {
        const runCode = `
        window.postMessage(${JSON.stringify(object)}, '*');
        true;
        `;
        this.webView.injectJavaScript(runCode);
    }

    injectRawToWebView(jsCode) {
        this.webView.injectJavaScript(jsCode);
    }

    render() {
        return (
            <WebView
                ref={webView => (this.webView = webView)}
                source={{ uri: this.fileURI }} 
                javaScriptEnabled={true}
                domStorageEnabled={true}
                allowFileAccess={true}
                allowUniversalAccessFromFileURLs={true}
                originWhitelist={['*']}
                onMessage={event => {
                    this.onMessageEvents(event.nativeEvent.data);
                }}
            />
        )
    }

    componentDidMount() {
        let controller = this;
        let asset = Asset.fromModule(require('../../public/map.html'));
        asset.downloadAsync().then(function() {
            controller.fileURI = asset.localUri;
            controller.setState({
                loadHtml: true
            });
            let assetJS = Asset.fromModule(require('../../public/bundle.jshtml'));
            assetJS.downloadAsync().then(function() {
                controller.jsURI = assetJS.localUri;
                controller.downloadJS();
            });
        });
        // this.changeScreenOrientation();
    }
}