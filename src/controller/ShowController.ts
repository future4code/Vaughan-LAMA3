import { Request, Response  } from "express";
import { DAY, ShowInputDTO } from "../business/model/Show";
import { ShowBusiness } from "../business/ShowBusiness";


export class ShowController { 
    constructor(
        private showBusiness: ShowBusiness
    ){ }

    public signShow = async(request: Request , response : Response): Promise<void> => {
       try{
        const { bandId , weekDay , startTime , endTime  } = request.body;

        const show : ShowInputDTO = { 
            bandId, 
            weekDay,
            startTime,
            endTime
        }

        await this.showBusiness.signShow(show) 
    } catch(error:any) {
        throw new Error(error.message);
        
    }
    }
    public gettingShowByDate = async(request: Request , response : Response): Promise<void> => {
       try { 

           const weekDay = request.body.weekDay as DAY 
           
           const result = await this.showBusiness.gettingShowByDate(weekDay) 

           response.status(200).send(result)


        } catch(error:any) {
            throw new Error(error.message);
            
        }
    }
}
