import { BandDatabase } from "../data/BandDatabase"
import { getbandByInputDTO } from "./model/Band"


export class BandBusiness{ 

    constructor(
        private bandDatabase : BandDatabase
    ){ }

    public singBand = async (): Promise<any> => { 

    }

    public getBandByIdName = async (input:getbandByInputDTO): Promise<any> => { 

        const inputDTO : getbandByInputDTO = {
            id: input.id, 
            name: input.name
        }
        
        if(!inputDTO.id && inputDTO.name){ 
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