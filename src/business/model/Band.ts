

export interface getbandByInputDTO { 
    id: string, 
    name: string
}


 export interface Band {
     id: string, 
     name: string, 
     musicGenre: string, 
     responsible: string, 
 }

 export interface BandInputDTO {
     id: string, 
     name: string, 
     music_genre: string, 
     responsible: string, 
 }