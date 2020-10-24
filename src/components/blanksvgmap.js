import React, { Component } from 'react';
import coordinate_distances_map from '../../assets/js/coordinate_map_distances';
import GameController from './GameController';
import Haversine from './haversine';
import BoardScale from './BoardScale';

class BlankSVGMap extends Component {

    controller = null;
    date = null;
    selectedLocation = null;
    selectedColor = null;
    total_items = 20;
    num_bins = null;
    
    constructor(props) {
        super(props);

        this.LOCATIONS = [];
        this.MARKERS = [];
        
        this.data = coordinate_distances_map['data'];
        BlankSVGMap.num_bins = this.data.length;
    }

    static get MAP() {
        return {
            'width': 1331.7148086 - 0.8092623405000419,
            'height': 673.8801239807999 - 0.863502518400044,
            'twidth': 0.8092623405000419,
            'theight': 0.863502518400044
        };
    }

    render() {
        return (
            <GameController ref={controller => (this.controller = controller)} 
                GameStorageController={this.props.GameStorageController}
                BoardScale={BoardScale}
                tokens={this.props.tokens}
            />
        );
    }

    componentDidMount() {
        this.date = new Date();
        this.controller.Map = this;
        let tokenVariations = Object.values(this.props.tokens);
        console.log(this.props.players);
        this.controller.players = this.props.players;
        Object.keys(this.controller.players).map((player, index) => {
            this.controller.setPlayer(player, tokenVariations[index]);
        });
    }

    static get getReferenceCoordinates() { return { 'lat': 0, 'lng': 0 }; }

    static get getMapCenter() { return { 'cx': BlankSVGMap.MAP['width'] / 2 + BlankSVGMap.MAP['twidth'], 'cy': BlankSVGMap.MAP['height'] / 2 + BlankSVGMap.MAP['theight'] }; }

    static get calibrationTranslate() {
        return { 'ctx': 0, 'cty': 0 };
    }

    static getMercatorXFromOrigin(lat, lng) {
        
        lat=Haversine.deg2rad(lat);
        lng=Haversine.deg2rad(lng);

        return BlankSVGMap.MAP['height'] / Math.PI * (0 - lng);
    }

    static getMercatorYFromOrigin(lat) {
        
        lat=Haversine.deg2rad(lat);

        return BlankSVGMap.MAP['height'] / Math.PI * Math.log((Math.tan(Haversine.deg2rad(45) + lat/2)) * 
        Math.pow((1 - Haversine.eccentricity * Math.sin(lat)) / (1 + Haversine.eccentricity * Math.sin(lat)), 0.5 * Haversine.eccentricity))
    }

    static getCoordinatesFromLatLng(lat, lng) {
        return {
            'cex': BlankSVGMap.getMercatorXFromOrigin(lat, lng),
            'cey': BlankSVGMap.getMercatorYFromOrigin(lat)
        };
    }

    static curvatureTranslate(x, y, lat, lng) {
        lat=Haversine.deg2rad(lat);
        lng=Haversine.deg2rad(lng);
        let latlogsgn = (Math.tan(lat) != 1) ? Math.log(Math.abs(Math.tan(lat))) : 1;
        let lnglogsgn = (Math.tan(lng) != 1) ? Math.log(Math.abs(Math.tan(lng))) : 1;
        let sgn = (lng != 0 && lat != 0) ? lng / Math.abs(lng) * lat / Math.abs(lat) : 0;
        let ysgn = lat / Math.abs(lat) * latlogsgn / Math.abs(latlogsgn);
        let xsgn = lnglogsgn / Math.abs(lnglogsgn) * lng / Math.abs(lng);
        let scale = Math.log((Math.tan(Haversine.deg2rad(45) + lat/2)));
        let xscale = Math.abs(scale);
        let yscale = Math.abs(scale);
        let factor = Math.pow((1 - Haversine.eccentricity * Math.sin(lat)) / (1 + Haversine.eccentricity * Math.sin(lat)), 0.5 * Haversine.eccentricity);
        let {ex, ey} = Haversine.eccentricityXY;
        return {
            'cux': x * 3.5 * Math.PI * ex * factor, //- xsgn * 6 * Math.pow(xscale,5) * lat * Math.abs(Math.sin(lat)) + lng / Math.abs(lng) * Math.abs(x) * Haversine.eccentricity * Math.abs(Math.sin(lng/2)), 
            'cuy': y * Math.PI * ey * factor //+ ysgn * 6 * Math.pow(yscale,7.3) * Math.abs(Math.sin(lat)) - lat / Math.abs(lat) * Math.abs(y) * Haversine.eccentricity * Math.pow(Math.exp(latlogsgn),2.7) * 2.3
        };
    }

    static getMarkerCoordinates(row) {
        
        let x = row['xcoord'];
        let y = row['ycoord'];

        return { 'x': x, 'y': y };
    }

    static get getDistanceColourWheel() { return [ 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20 ]; }

    static get getTokenVariations() { return [ 'aqua', 'blue', 'green', 'red', 'violet', 'yellow' ]; }

    static getMultinomialDistribution(limits) {
        return [3,3,2,1,2,1,1,0,1,0,1,1,0,1,1,1,0,1]
    }

    get getDistributionLimits() {
        return this.data.map((item) => {
            return item.length;
        });
    }

    get getLimits() {
        return this.data.map((item) => {
            return [0, item.length-1];
        });
    }

    getStrandedRandom(distribution) {
        // var limits = this.getLimits;

        // var random = limits.map((limit) => {
        //     let chosenRandom;
        //     return function getRandom() {
        //         var min = limit[0], max = limit[1];
        //         var item = Math.round(Math.random() / (max - min + 1) * max);

        //         return item === chosenRandom ? getRandom(limit) : item;
        //     };
        // });

        // var strandedRandom = random.map((func, index) => {
        //     var strand = [];
        //     for(var i in distribution) {
        //         if (distribution[i] > 0) {
        //             strand.push(func(limits[index]));
        //         }
        //     }
        //     return strand;
        // });

        // return strandedRandom;
        return [[10,11,26],[32,2,24],[2,8],[4],[7,4],[8],[8],null,[4],null,[4],[1],null,[1],[1],[1],null,[1]]
    }

    set locations(locations) { this.LOCATIONS = locations; }

    get locations() {
        if (this.LOCATIONS.length == 0) {
            var distLimits = this.getDistributionLimits;
            var distribution = BlankSVGMap.getMultinomialDistribution(distLimits);
            this.LOCATIONS = this.getStrandedRandom(distribution);
        }
        return this.LOCATIONS;
    }

    get markers() { return this.MARKERS; }

    set markers(locations) {
        let row = null, x = null, y = null;
        this.MARKERS = [];
        for(var i in locations) {
            if (!locations[i]) {
                continue;
            }
            for (var j in locations[i]) {
                row = this.data[i][locations[i][j]];
                if (!row) {
                    continue;
                }
                let {x, y} = BlankSVGMap.getMarkerCoordinates(row);
                this.MARKERS.push({
                    'x': x,
                    'y': y,
                    'color': row.Hex,
                    'Dest': row.Dest
                });
                let object = {
                    type: 'create_marker',
                    ...this.MARKERS[i]
                };
                this.controller.plan.injectBasicToWebView(object);
            }
        }
    }

    clearMarkers() {
        let object = {
            type: 'clear_markers'
        };
        this.controller.plan.injectBasicToWebView(object);
    }

    removeMarker(hex) {
        let object = {
            type: 'remove_marker',
            color: hex
        };
        this.controller.plan.injectBasicToWebView(object);
    }
    
}

export {
    BlankSVGMap
};