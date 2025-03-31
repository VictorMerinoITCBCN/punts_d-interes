import { LeafletMap } from "./adapter/LeafletMap.js"
import { Menu } from "./adapter/Menu.js";

const map = new LeafletMap();
const menu = new Menu();

menu.onClear = () => map.clearMap();

menu.onFileLoad = (points) => {
    map.clearMap();
    points.forEach(point => {
        map.addPoint(point.coordinates, PointDescription(point));
    });
}

const PointDescription = (point) => {
    let desc = `
    <h2>${point.name}</h2>
    <span>${point.direction}</span>
    `;

    if (point.schedules) desc += `<br/><small>${point.schedules}</small>`;

    if (point.description) desc += `<p>${point.description}</p>`;

    if (point.price && point.coin) desc += `<br/><b>Entrada: ${point.price}${point.coin}</b>`;

    return desc;
}

menu.interestPointOnClick = (point) => {
    map.addPoint(point.coordinates, PointDescription(point));
    map.moveTo(point.coordinates, 15);
};