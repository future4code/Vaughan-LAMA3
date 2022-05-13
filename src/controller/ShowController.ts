import { Request, Response  } from "express";
import { ShowBusiness } from "../business/ShowBusiness";


export class ShowController { 
    constructor(
        private showBusiness: ShowBusiness
    ){ }

    public signShow = async(request: Request , response : Response): Promise<void> => {
       
        const { bandId , weekDay , startTime , endTime  } = request.body;

        // const show : ShowInputDTO = { 

        }

    }

