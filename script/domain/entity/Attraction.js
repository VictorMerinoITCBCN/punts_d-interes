import { InterestPoint } from "./InterestPoint.js";

export class Attraction extends InterestPoint {
    schedules;
    price;
    coin;

    constructor(country, city, name, direction, coordinates, score, schedules, price, coin) {
        super(country, city, name, direction, coordinates, score);
        this.schedules = schedules;
        this.price = price;
        this.coin = coin;
        this.type = "Attraction"
    }
}