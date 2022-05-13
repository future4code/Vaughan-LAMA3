import { Band, BandInputDBDTO } from "../business/model/Band";
import { BaseDatabase } from "./BaseDatabase";

export class BandDatabase extends BaseDatabase {

    public insertingBand = async(band: Band)=> { 
        
       const bandDB:BandInputDBDTO = {
        id:band.id,
        name:band.name,
        music_genre: band.musicGenre,
        responsible: band.responsible
       }

       await BaseDatabase.connection("lama_bands")
       .insert(bandDB)

    }

    public getBandById = async (id: string) => {

        const [result]: BandInputDBDTO[] = await BaseDatabase.connection("lama_bands")
            .where({ id })

        const Band: Band = {
            id: result.id,
            name: result.name,
            musicGenre: result.music_genre,
            responsible: result.responsible
        }
        return Band
    }
    public getBandByName = async (name: string) => {

        const [result]: BandInputDBDTO[] = await BaseDatabase.connection("lama_bands")
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