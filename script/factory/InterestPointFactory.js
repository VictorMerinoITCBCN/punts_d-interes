import { InterestPoint } from "../domain/entity/InterestPoint.js";
import { Attraction } from "../domain/entity/Attraction.js";
import { Museum } from "../domain/entity/Museum.js"
import { Coordinates } from "../domain/entity/Coordinates.js";

export class InterestPointFactory {

    static fromCsvRow(row) {
        switch (row.tipus.toLowerCase()) {
            case "espai":
                return new InterestPoint(
                    row.pais, 
                    row.ciutat, 
                    row.nom, 
                    row.direcció, 
                    new Coordinates(row.latitud, row.longitud), 
                    row.puntuacio
                );
            case "atraccio":
                return new Attraction(
                    row.pais, 
                    row.ciutat, 
                    row.nom, 
                    row.direcció, 
                    new Coordinates(row.latitud, row.longitud), 
                    row.puntuacio, 
                    row.horaris, 
                    row.preu, 
                    row.moneda
                );
            case "museu":
                return new Museum(
                    row.pais, 
                    row.ciutat, 
                    row.nom, 
                    row.direcció, 
                    new Coordinates(row.latitud, row.longitud), 
                    row.puntuacio, 
                    row.horaris, 
                    row.preu, 
                    row.moneda, 
                    row.descripcio
                );
        }
    }
}