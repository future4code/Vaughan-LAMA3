import { Band } from "../../src/business/model/Band";
import { bandMock } from "./bandMock";

export class BandDatabaseMock {
    public async insertingBand(band: Band): Promise<void> { }

    public async getBandById(id: string): Promise< Band | undefined> {
        if (id === "id_mock") {
            return bandMock
        } else {
            undefined
        }
    }

    public async getBandByName(name: string): Promise<Band | undefined> {
        if(name === "Calypso") {
            return bandMock
        } else {
            undefined
        }
    }
}