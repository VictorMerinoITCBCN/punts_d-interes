export const DEFAULT_INIT_COORDINATES = [41.3851, 2.1734];

export const DEFAULT_MAP_OPTIONS = {
    center: DEFAULT_INIT_COORDINATES,
    zoom: 3,
    layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' })
    ]
};

export const DEFAULT_INTEREST_POINT_TYPES = [
    "All",
    "Place",
    "Attraction",
    "Museum"
]