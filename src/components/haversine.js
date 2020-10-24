class Haversine {

    static get R() {
        return 6371;
    };
    static get km2miles() {
        return 0.621371;
    };
    
    static deg2rad(deg) {
        return deg * (Math.PI/180);
    }

    static square(x) { 
        return Math.pow(x, 2);
    }

    /* Distance between two lat/lng coordinates in km using the Haversine formula */

    static getDistanceFromLatLng(lat1, lng1, lat2, lng2, miles) { // miles optional

        if (typeof miles === "undefined"){miles=false;}

        var r=Haversine.R; // radius of the earth in km

        lat1=Haversine.deg2rad(lat1);
        lat2=Haversine.deg2rad(lat2);
        
        var lat_dif=lat2-lat1;
        var lng_dif=Haversine.deg2rad(lng2-lng1);
        var a=square(Math.sin(lat_dif/2))+Math.cos(lat1)*Math.cos(lat2)*square(Math.sin(lng_dif/2));
        var d=2*r*Math.asin(Math.sqrt(a));
        
        if (miles){ return d * Haversine.km2miles; } //return miles

        else{ return d; } //return km
    }

/* Copyright 2016, Chris Youderian, SimpleMaps, http://simplemaps.com/resources/location-distance
Released under MIT license - https://opensource.org/licenses/MIT */ 

    static get eccentricity() {
        return 0.006694380023;
    }

    static get eccentricityXY() {
        // return 0.006694380023;
        return {'ex': 0.009, 'ey': 0.006};
    }

}

export default Haversine;