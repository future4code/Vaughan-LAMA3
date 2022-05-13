
export enum DAY { 
    "friday" = "friday",
    "saturday" = "saturday",
    "sunday" = "sunday"
}

export interface ShowInputDTO  { 
    
    bandId : string 
    weekDay: DAY
    startTime: number
    endTime: number
}
export interface Show  { 
    id:string
    bandId : string 
    weekDay: DAY
    startTime: number
    endTime: number
}

export interface ShowOutDTO  { 
    id: string
    week_day: DAY
    start_time: number
    end_time:  number
    band_id : string 
}

export interface ShowDateDTO { 

    week_day: string
    start_time: number
    end_time: number


}
export interface ShowDate { 

    weekDay: string
    startTime: number
    endTime: number

}