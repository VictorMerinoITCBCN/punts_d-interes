import { DEFAULT_INIT_COORDINATES, DEFAULT_MAP_OPTIONS } from "../constants.js";
import { Coordinates } from "../domain/entity/Coordinates.js"

export class LeafletMap {

    #map;
    #layer;
    #clientCoordinateStorageKey = "client-coords";

    constructor(id = "map", options = DEFAULT_MAP_OPTIONS) {
        this.#map = L.map(id, options);
        this.#layer = L.layerGroup().addTo(this.#map);
        this.renderCenterMapBtn();
        this.getClientCoordinates()
        .then(coords => {
            this.moveTo(coords, 13);
            this.addPoint(coords, "Tu");
        });
    }

    renderCenterMapBtn() {
        const $btn = document.createElement("button");
        $btn.id = "center-map-btn";
        $btn.innerHTML = `<span class="material-symbols-outlined">center_focus_weak</span>`;
        $btn.addEventListener("click", () => this.getClientCoordinates().then(coords => this.moveTo(coords)));

        this.#map._container.appendChild($btn);
    }

    moveTo(coords, zoom) {
        this.#map.flyTo(coords, zoom, {
            duration: 1
        })
    }

    addPoint(coordinates, desc) {
        const point = L.marker(coordinates);
        point.bindPopup(desc);
        point.addTo(this.#layer);
        point.openPopup();
    }

    clearMap() {
        this.#layer.clearLayers();
    }

    getClientCoordinates() {
        return new Promise((resolve) => {
            const storageCoords = sessionStorage.getItem(this.#clientCoordinateStorageKey);
            if (storageCoords) return resolve(JSON.parse(storageCoords));
    
            if (!navigator.geolocation) return resolve(DEFAULT_INIT_COORDINATES);
    
            navigator.geolocation.getCurrentPosition(
                position => {
                    const coords = new Coordinates(position.coords.latitude, position.coords.longitude);
                    sessionStorage.setItem(this.#clientCoordinateStorageKey, JSON.stringify(coords));
                    resolve(coords);
                },
                () => resolve(DEFAULT_INIT_COORDINATES)
            );
        });
    }
    
}