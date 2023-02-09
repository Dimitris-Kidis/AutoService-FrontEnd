export class MasterHistoryRow {
    carInto: string;
    services: string;
    clientName: string;
    clientAvatar: string;
    done: boolean;
    stars: number;

    constructor(
        carInto: string,
        services: string,
        clientName: string,
        clientAvatar: string,
        done: boolean,
        stars: number
    ) {
        this.carInto = carInto;
        this.services = services;
        this.clientName = clientName;
        this.clientAvatar = clientAvatar;
        this.done = done;
        this.stars = stars;
       
    }
}