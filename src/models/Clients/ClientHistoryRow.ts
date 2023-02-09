export class ClientHistoryRow {
    carInto: string;
    services: string;
    masterName: string;
    masterAvatar: string;
    done: boolean;
    stars: number;

    constructor(
        carInto: string,
        services: string,
        masterName: string,
        masterAvatar: string,
        done: boolean,
        stars: number
    ) {
        this.carInto = carInto;
        this.services = services;
        this.masterName = masterName;
        this.masterAvatar = masterAvatar;
        this.done = done;
        this.stars = stars;
       
    }
}