
export enum DAY { 
    "Friday" = "Friday",
    "Saturday" = "Saturday",
    "Sunday" = "Sunday"
}


export interface ShowInputDTO  { 
    id: string
    week_day: DAY
    start_time: number
    end_time:  number
    band_id : string 
}