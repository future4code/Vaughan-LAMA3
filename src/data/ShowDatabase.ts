import { Show, ShowDate, ShowDateDTO, ShowOutDTO } from "../business/model/Show";
import { BaseDatabase } from "./BaseDatabase";


export class ShowDatabase extends BaseDatabase {

    public insertShow = async (show: Show) => {
        try {

            const showDb: ShowOutDTO = (
                {
                    id: show.id,
                    week_day: show.weekDay,
                    start_time: show.startTime,
                    end_time: show.endTime,
                    band_id: show.bandId
                })

            await BaseDatabase.connection("lama_shows")
                .insert(showDb)
        } catch (error: any) {
            throw new Error(error.sqlmessage || error.message);

        }
    }
    public checkTimeSlot = async (show: Show) => {
        try {

            const showDb: ShowOutDTO = (
                {
                    id: show.id,
                    week_day: show.weekDay,
                    start_time: show.startTime,
                    end_time: show.endTime,
                    band_id: show.bandId
                })


            return BaseDatabase.connection("lama_shows")
                .where({ week_day: show.weekDay })
                .havingBetween('start_time', [show.startTime, show.endTime])

        } catch (error: any) {
            throw new Error(error.sqlmessage || error.message);

        }
    }
    public gettingShowByDate = async (data: ShowDate) => {
        try {

            const showByDate: ShowDateDTO =
            {
                week_day: data.weekDay,
                start_time: data.startTime,
                end_time: data.endTime,
            }


            const result = await BaseDatabase.connection("lama_shows")
                .join("lama_bands", "lama_bands.id", "=", "lama_shows.band_id")
                .where({ week_day: showByDate.week_day })
                .havingBetween('start_time', [showByDate.start_time, showByDate.end_time])
                .orderBy('start_time')

            return result.map(item => {
                return {
                    name: item.name,
                    musicGenre: item.music_genre
                }
            })

        } catch (error: any) {
            throw new Error(error.sqlmessage || error.message);
        }
    }
}