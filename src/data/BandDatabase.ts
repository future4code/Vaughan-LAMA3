import { Band, BandInputDTO } from "../business/model/Band";
import { BaseDatabase } from "./BaseDatabase";

export class BandDatabase extends BaseDatabase {

    public getBandById = async (id: string) => {

        const [result]: BandInputDTO[] = await BaseDatabase.connection("lama_bands")
            .where({ id })

        const Band: Band = {
            id: result.id,
            name: result.name,
            musicGenre: result.music_genre,
            responsible: result.responsible
        }
        return result

    }
    public getBandByName = async (name: string) => {

        const [result]: BandInputDTO[] = await BaseDatabase.connection("lama_bands")
            .where({ name })

        const Band: Band = {
            id: result.id,
            name: result.name,
            musicGenre: result.music_genre,
            responsible: result.responsible
        }
        return Band
    }
}