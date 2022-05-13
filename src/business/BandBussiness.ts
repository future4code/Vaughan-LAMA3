import { BandDatabase } from "../data/BandDatabase"
import { Band, BandinputdDTO, getbandByInputDTO } from "./model/Band"
import { IdGenerator } from "./services/IdGenerator"


export class BandBusiness {

    constructor(
        private bandDatabase: BandDatabase,
        private idGenerator: IdGenerator
    ) { }

    public signingBand = async (input: BandinputdDTO): Promise<void> => {
        try {
            const { name, musicGenre, responsible } = input

            if (!name || !musicGenre || !responsible) {
                throw new Error("Please fill all the fields.")
            }

            const bandNameExists = await this.bandDatabase.getBandByName(name)

            if (bandNameExists) {
                throw new Error("This band has already been registered.")
            }

            const id = this.idGenerator.generateId()
            console.log(id)

            await this.bandDatabase.insertingBand(
                new Band(
                    id,
                    name,
                    musicGenre,
                    responsible
                )
            )

        } catch (error: any) {
            throw new Error(error.message)
        }


    }

    public getBandByIdName = async (input: getbandByInputDTO): Promise<Band | undefined> => {

        const inputDTO: getbandByInputDTO = {
            id: input.id,
            name: input.name
        }

        if (!inputDTO.id && !inputDTO.name) {
            throw new Error("Input is missing!");
        }

        if (!input.id) {
            const result = await this.bandDatabase.getBandByName(inputDTO.name)
            return result;
        }

        if (!input.name) {
            const result = await this.bandDatabase.getBandById(inputDTO.id)
            return result;
        }

    }


}