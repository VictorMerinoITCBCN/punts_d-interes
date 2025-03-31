export class Coordinates {
    lat;
    lon;

    constructor(lat, lon) {
        if (isNaN(lat) || isNaN(lon)) throw new TypeError("Invalid coordinates");
        this.lat = lat;
        this.lon = lon;
    }
}