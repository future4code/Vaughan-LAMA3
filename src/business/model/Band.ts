

export interface getbandByInputDTO { 
    id: string, 
    name: string
}

export class Band {
    constructor(
        public id: string,
        public name: string,
        public musicGenre: string,
        public responsible: string
    ) {}

    public getId() {
        return this.id
    }

    public getName() {
        return this.name
    }

    public getMusicGenre() {
        return this.musicGenre
    }

    public getResponsible() {
        return this.responsible
    }
}

//  export interface Band {
//      id: string, 
//      name: string, 
//      musicGenre: string, 
//      responsible: string, 
//  }

 export interface BandinputdDTO {
     name: string, 
     musicGenre: string, 
     responsible: string, 
 }



 export interface BandInputDBDTO {
     id: string, 
     name: string, 
     music_genre: string, 
     responsible: string, 
 }