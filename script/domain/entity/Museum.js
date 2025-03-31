import { InterestPoint } from "./InterestPoint.js";

export class Museum extends InterestPoint {

    constructor(country, city, name, direction, coordinates, score, schedules, price, coin, description) {
        super(country, city, name, direction, coordinates, score);
        this.schedules = schedules;
        this.price = price;
        this.coin = coin;
        this.description = description;
        this.type = "Museum";
    }
}