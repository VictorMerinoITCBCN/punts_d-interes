import { Coordinates } from "./Coordinates.js"

export class InterestPoint {
    static #numOfInstances = 0;

    #id;
    #isManual;
    country;
    city;
    name;
    direction;
    type;
    coordinates;
    score;

    constructor(country, city, name, direction, coordinates, score) {
        if (!(coordinates instanceof Coordinates)) {
            throw new TypeError("Invalid Coordinates");
        }
        this.#id = InterestPoint.#numOfInstances++;
        this.country = country;
        this.city = city
        this.name = name;
        this.direction = direction
        this.coordinates = coordinates;
        this.score = score;
        this.type = "Place";
    }

    get id() {
        return this.#id;
    }

    get isManual() {
        return this.#isManual;
    }
}