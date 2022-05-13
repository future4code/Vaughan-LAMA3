import { ShowDatabase } from "../data/ShowDatabase";
import { DAY, Show, ShowDate, ShowInputDTO } from "./model/Show";
import { IdGenerator } from "./services/IdGenerator";


export class ShowBusiness {
  constructor(
    private showDatabase: ShowDatabase,
    private idGenerator : IdGenerator
  ) { }
  public signShow = async (input: ShowInputDTO) => {

    // const { bandId, weekDay, startTime, endTime } = input

    // if (!bandId || !weekDay || !startTime || !endTime) {
    //   throw new Error("Please fill all the fields!");
    // }
    // if (startTime < 8 || startTime > 22 || endTime < 9 || endTime > 23) {
    //   throw new Error("That's out of our show hours!");
    // }
    // if (weekDay.toLowerCase().trim() !== "friday" &&weekDay.toLowerCase().trim() !== "saturday" && weekDay.toLowerCase().trim() !== "sunday") {
    //   throw new Error("That's out of our show hours!");
    // }
    const { bandId, weekDay, startTime, endTime } = this.checks(input)

    const id = this.idGenerator.generateId();

    const show: Show = {
      id,
      bandId, 
      weekDay, 
      startTime, 
      endTime
    }
        
      const showsInthatTime = await this.showDatabase.checkTimeSlot(show)
     
      if(showsInthatTime.length > 0 ) { 
        throw new Error("This slot is not available!");
      }
   
       await this.showDatabase.insertShow(show)



    //  const showArray : Show[]=[]
    //     let j = endTime - startTime
    //   //  for( let i = startTime ; i <= endTime  ;  i++ ){
    //    for( let i = startTime ; i <= endTime-1  ;  i++ ){
    //       // const a = {id , bandId , weekDay , startTime : i, endTime , durantion : j-- }
    //       const id = this.idGenerator.generateId()
    //       const a = {id , bandId , weekDay , startTime : i, endTime  }
    //       showArray.push(a)           
    //    }
    //    console.log(showArray)
    //   await this.showDatabase.insertShow(showArray)

  }
  public  gettingShowByDate = async(input: DAY )=> {
    
    const Date : ShowDate =  {
    weekDay: input,
    startTime: 8,
    endTime: 23,
    }

    const result = this.showDatabase.gettingShowByDate(Date)
     
    


   
  }
  public checks =(input :ShowInputDTO )=> { 
    const { bandId, weekDay, startTime, endTime } = input

    if (!bandId || !weekDay || !startTime || !endTime) {
      throw new Error("Please fill all the fields!");
    }
    if (startTime < 8 || startTime > 22 || endTime < 9 || endTime > 23) {
      throw new Error("That's out of our show hours!");
    }
    if (weekDay.toLowerCase().trim() !== "friday" &&weekDay.toLowerCase().trim() !== "saturday" && weekDay.toLowerCase().trim() !== "sunday") {
      throw new Error("That's out of our show hours!");
    }

    return input;
  }


}