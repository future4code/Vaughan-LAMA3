import { Band, BandInputDBDTO } from "../business/model/Band";
import { BaseDatabase } from "./BaseDatabase";

export class BandDatabase extends BaseDatabase {
    protected tableName: string = "lama_bands"

    private toBandModel(data: any): Band {
        return (
            data &&
            new Band(
                data.id,
                data.name,
                data.musicGenre,
                data.responsible
            )
        )
    }

    public insertingBand = async (band: Band) => {
        try {
            const bandDB: BandInputDBDTO = {
                id: band.id,
                name: band.name,
                music_genre: band.musicGenre,
                responsible: band.responsible
            }

            await BaseDatabase.connection(this.tableName)
                .insert(bandDB)

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }

    }

    public getBandById = async (id: string) => {

        const band: BandInputDBDTO[] = await BaseDatabase.connection(this.tableName)
            .where({ id })

        return band[0] && this.toBandModel(band[0])
    }

    public getBandByName = async (name: string) => {

        const band: BandInputDBDTO[] = await BaseDatabase.connection(this.tableName)
            .where({ name })

        return band[0] && this.toBandModel(band[0])
    }
}