import { BandDatabase } from "../data/BandDatabase"
import { BaseDatabase } from "../data/BaseDatabase"
import { Band, BandinputdDTO, getbandByInputDTO } from "./model/Band"
import { Authenticator } from "./services/Authenticator"
import { IdGenerator } from "./services/IdGenerator"


export class BandBusiness{ 

    constructor(
        private bandDatabase : BandDatabase,
        private idGenerator : IdGenerator, 
        private authenticator  : Authenticator
    ){ }

    public signingBand = async (input: BandinputdDTO): Promise<void> => { 

         
        const id = this.idGenerator.generateId()
 
        const band: Band = { 
            id, 
            name:input.name, 
            musicGenre : input.musicGenre,
            responsible : input.responsible
        }
        await this.bandDatabase.insertingBand(band)

    }

    public getBandByIdName = async (input:getbandByInputDTO): Promise<Band| undefined > => { 

        const inputDTO : getbandByInputDTO = {
            id: input.id, 
            name: input.name
        }
        
        if(!inputDTO.id && !inputDTO.name){ 
            throw new Error("Input is missing!");
        }

        if(!input.id){ 
            const result = await this.bandDatabase.getBandByName(inputDTO.name)
            return result;
        }
  
        if(!input.name){ 
            const result = await this.bandDatabase.getBandById(inputDTO.id)
            return result; 
        }

    }


}