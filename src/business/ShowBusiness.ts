import { response } from "express";
import { ShowDatabase } from "../data/ShowDatabase";
import { DAY, Show, ShowDate, ShowInputDTO } from "./model/Show";
import { IdGenerator } from "./services/IdGenerator";

export class ShowBusiness {
  constructor(
    private showDatabase: ShowDatabase,
    private idGenerator: IdGenerator
  ) { }
  public signShow = async (input: ShowInputDTO) => {
    try {

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

      if (showsInthatTime.length > 0) {
        throw new Error("This slot is not available!");
      }

      await this.showDatabase.insertShow(show)
      return "Show signed successfully!"

    } catch (error: any) {
      throw new Error(error.message)

    }

  }

  public gettingShowByDate = async (input: DAY) => {

    if (input.toLowerCase().trim() !== "sunday" && input.toLowerCase().trim() !== "satuday" && input.toLowerCase().trim() !== "friday") {
      throw new Error("That's not a valid day!")
    }

    const Date: ShowDate = {
      weekDay: input,
      startTime: 8,
      endTime: 23,
    }

    const result = await this.showDatabase.gettingShowByDate(Date)

    if (result.length === 0 || !result) {
      throw new Error("There are no shows this day, yet!")
    }

    return result
  }

  public checks = (input: ShowInputDTO) => {
    try {

      const { bandId, weekDay, startTime, endTime } = input

      if (!bandId || !weekDay || !startTime || !endTime) {
        throw new Error("Please fill all the fields!");
      }
      if (startTime < 8 || startTime > 22 || endTime < 9 || endTime > 23) {
        throw new Error("That's out of our show hours!");
      }
      if (weekDay.toLowerCase().trim() !== "friday" && weekDay.toLowerCase().trim() !== "saturday" && weekDay.toLowerCase().trim() !== "sunday") {
        throw new Error("That's out of our show hours!");
      }

      return input;
    }

    catch (error: any) {
      throw new Error(error.message)
    }
  }


}