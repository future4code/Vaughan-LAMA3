import { BandDatabase } from "../data/BandDatabase"
import { Band, BandinputdDTO, getbandByInputDTO } from "./model/Band"
import { Authenticator } from "./services/Authenticator"
import { IdGenerator } from "./services/IdGenerator"


export class BandBusiness {

    constructor(
        private bandDatabase: BandDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    public signingBand = async (input: BandinputdDTO, token: string): Promise<void> => {
        try {
            const { name, musicGenre, responsible } = input

            if (!token) {
                throw new Error("Authorization needed.")
            }

            const tokenData = this.authenticator.getTokenData(token);

            if (tokenData.role !== "ADMIN") {
                throw new Error("You don't have permission to sign a band.")
            }

            if (!name || !musicGenre || !responsible) {
                throw new Error("Please fill all the fields.")
            }

            const bandNameExists = await this.bandDatabase.getBandByName(name)

            if (bandNameExists) {
                throw new Error("This band has already been registered.")
            }

            const id = this.idGenerator.generateId()

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