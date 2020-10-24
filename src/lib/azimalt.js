import SunCalc from './suncalc';

export default class AzimAlt {

    static SUN_SVG = '/assets/svg/sun.svg';

    static polar2Cartesian(radius, angle) {
        return [radius * Math.cos(angle), -radius * Math.sign(angle)]
    }
    
    static translateCartesian(coordinates, origin) {
        console.log("Origin", origin);
        return [coordinates[0] + origin[0], coordinates[1] + origin[1]]
    }
    
    static drawAzimuthArc(ctx, angle, coordinates, radius) {
        ctx.arc(coordinates[0], coordinates[1], radius, -Math.PI / 2, -Math.PI / 2 + angle, false);
        return ctx
    }
    
    static drawAltitudeArc(ctx, angle, coordinates, radius) {
        var anticlockwise = angle > 0;
        ctx.arc(coordinates[0], coordinates[1], radius, 0, -Math.abs(angle), anticlockwise);
        return ctx
    }

    static drawImage(ctx, position) {
        return function() {
            ctx.drawImage(this, ctx.canvas.width/2, ctx.canvas.height/2, this.width, this.height);
        }
    }

    static sunPath() {
        let outerPath = new Path2D("M140.796,92.339l14.956-12.837l0.39-0.336l-0.39-0.334l-14.604-12.536\
        c-2.146-2.287-2.559-4.183-1.79-7.121l6.53-18.594l0.172-0.487l-0.505-0.094l-18.959-3.563c-2.94-0.728-4.426-2.378-5.058-5.213\
        l-3.651-19.418l-0.093-0.506l-0.483,0.169l-18.19,6.39c-2.94,0.607-4.755,0.607-7.365-2.062L78.531,0.39L78.195,0l-0.334,0.39\
        L64.634,15.798c-1.702,1.843-3.353,2.669-6.025,1.608l-19.15-6.727l-0.484-0.17l-0.095,0.505l-3.75,19.95\
        c-0.332,2.271-0.746,3.591-4.153,4.135l-19.419,3.65l-0.506,0.095l0.172,0.484l6.379,18.161c1.6,4.128,0.692,4.705-1.993,7.045\
        L0.638,77.385l-0.389,0.335l0.389,0.334l14.594,12.529c1.908,1.81,2.815,3.543,1.792,7.155L10.5,116.307l-0.17,0.484l0.504,0.095\
        l18.906,3.554c3.406,0.666,4.479,2.48,5.124,5.288l3.637,19.354l0.096,0.506l0.485-0.173l18.108-6.36\
        c3.102-0.788,5.082-0.376,7.131,2.016l12.816,14.929l0.336,0.391l0.335-0.391l12.503-14.565c1.827-1.849,3.808-2.921,7.205-1.811\
        l18.54,6.515l0.489,0.17l0.091-0.506l3.553-18.895c0.661-3.163,1.898-4.235,5.29-5.133l19.354-3.636l0.505-0.098l-0.169-0.484\
        l-6.371-18.132C137.764,96.271,138.095,94.456,140.796,92.339z M78.196,131.94c-29.54,0-53.487-23.947-53.487-53.486\
        c0-29.541,23.947-53.488,53.487-53.488c0.825,0,1.645,0.025,2.46,0.062l0,0c28.396,1.287,51.027,24.711,51.027,53.426\
        C131.684,107.994,107.736,131.94,78.196,131.94z");
        let fillOuterPath = "#FDD633";
        let inPathFillYellow = new Path2D("M80.657,25.028v106.85c-0.816,0.038-1.635,0.063-2.46,0.063c29.54,0,53.488-23.947,53.488-53.486\
        C131.684,49.739,109.053,26.315,80.657,25.028z");
        let fillYellow = "#F2AB0C";
        let inPathFillLite = new Path2D("M80.657,25.028L80.657,25.028c-0.816-0.037-1.635-0.062-2.46-0.062\
        c-29.54,0-53.487,23.947-53.487,53.488c0,29.54,23.947,53.486,53.487,53.486c0.825,0,1.645-0.025,2.46-0.063V25.028z");
        let fillLite = "#F4940B";
        return [outerPath, fillOuterPath, inPathFillYellow, fillYellow, inPathFillLite, fillLite];
    }
    
    static drawAzimuthSun(ctx, angle, radius, origin) {
        let axisAngle = -Math.PI/2 + angle;
        ctx.translate(origin[0], origin[1]);
        ctx.rotate(axisAngle);
        ctx.translate(radius*1.2, -radius*Math.cos(angle));
        ctx.scale(0.12, 0.12);
        let [outerPath, fillOuterPath, inPathFillYellow, fillYellow, inPathFillLite, fillLite] = AzimAlt.sunPath();
        ctx.fillStyle = fillOuterPath;
        ctx.fill(outerPath);
        ctx.fillStyle = fillYellow;
        ctx.fill(inPathFillYellow);
        ctx.fillStyle = fillLite;
        ctx.fill(inPathFillLite);
        ctx.restore();
        ctx.resetTransform();
        return ctx;
    }
    
    static drawAltitudeSun(ctx, angle, radius, origin) {
        var axisAngle = -angle;
        ctx.translate(origin[0], origin[1]);
        ctx.rotate(axisAngle);
        ctx.translate(2.2*radius, -radius*Math.cos(angle));
        ctx.scale(0.12, 0.12);
        let [outerPath, fillOuterPath, inPathFillYellow, fillYellow, inPathFillLite, fillLite] = AzimAlt.sunPath();
        ctx.fillStyle = fillOuterPath;
        ctx.fill(outerPath);
        ctx.fillStyle = fillYellow;
        ctx.fill(inPathFillYellow);
        ctx.fillStyle = fillLite;
        ctx.fill(inPathFillLite);
        ctx.restore();
        ctx.resetTransform();
        return ctx;
    }

    static ruler(ctx) {
        let canvas = ctx.canvas;
        let { width, height } = canvas;
        ctx.restore();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#ffffff";
        ctx.beginPath();
        ctx.moveTo(width/2, 0);
        ctx.lineTo(width/2, height);
        ctx.stroke();
        ctx.restore();
        ctx.font = 'bold 13px serif';
        ctx.fillStyle = "#ffffff";
        ctx.fillText('Azimuth', 1*width/7+10, 20);
        ctx.fillText('Altitude', 5*width/7-20, 20);
        ctx.restore();
    }

    static canvasGradient(ctx) {
        let gradient = ctx.createLinearGradient(0, ctx.canvas.height, ctx.canvas.width, 0);
        gradient.addColorStop(0, "#7856AE");
        gradient.addColorStop(0.3, "#6c81c9");
        gradient.addColorStop(0.6, "#4ea1d8");
        gradient.addColorStop(1, "#64cdc6");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, ctx.canvas.height/2, ctx.canvas.width, ctx.canvas.height);
    }
    
    static drawDesignTile(ctx, lat, lng, date) {
        ctx.restore();
        AzimAlt.canvasGradient(ctx);
        AzimAlt.ruler(ctx);
        ctx.strokeStyle = "#FDD633";
        let {azimuth, altitude} = SunCalc.getPosition(date, lat, lng);
        let startX = 80, startY = 100, incrementTile = 120;
        var axisRadius = 13;
        ctx.restore();
        ctx.moveTo(startX, startY + axisRadius);
        ctx.beginPath();
        ctx.lineTo(startX, startY); // north line
        ctx.font = 'normal 12px serif';
        ctx.fillText('N', startX-6, startY-50);
        var coordinates = [startX,startY];
        ctx = AzimAlt.drawAzimuthArc(ctx, azimuth, coordinates, 2*axisRadius);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
        ctx.moveTo(startX + incrementTile, startY);
        ctx.beginPath();
        ctx.lineTo(startX + axisRadius + incrementTile, startY); // azimuth line
        ctx.font = 'normal 12px serif';
        ctx.fillText('Az', startX + axisRadius + incrementTile+45, startY-2);
        var coordinates = [startX + axisRadius + incrementTile, startY];
        ctx = AzimAlt.drawAltitudeArc(ctx, altitude, coordinates, 2*axisRadius);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
        ctx = AzimAlt.drawAzimuthSun(ctx, azimuth, axisRadius, [startX, startY]);
        ctx = AzimAlt.drawAltitudeSun(ctx, altitude, axisRadius, [startX + incrementTile, startY]);
        ctx.restore();
    }

}
