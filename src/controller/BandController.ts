import { request, Request , response, Response } from "express";
import { BandBusiness } from "../business/BandBussiness";
import {  getbandByInputDTO } from "../business/model/Band";



export class BandController { 
    constructor(
        private bandBusiness : BandBusiness
    ){ }

    public singBand = async (request: Request , Response :Response): Promise<void> => { 

       

    }



    public getBandByIdName = async (request: Request , response :Response): Promise<void> => { 
      try{ 
          
          const {id , name} = request.query; 
  
          const inputDTO : getbandByInputDTO = { 
              id: id as string , 
              name:name as string
          }
  
          const result = await this.bandBusiness.getBandByIdName(inputDTO)
  
          response.send(result)
      } catch(error: any) { 
          throw new Error(error.message);
      }

    }
}