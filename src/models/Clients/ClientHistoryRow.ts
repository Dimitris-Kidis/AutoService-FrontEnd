export class ClientHistoryRow {
    carInfo: string;
    services: string;
    masterName: string;
    masterAvatar: string;
    done: boolean;
    stars: number;

    constructor(
        carInfo: string,
        services: string,
        masterName: string,
        masterAvatar: string,
        done: boolean,
        stars: number
    ) {
        this.carInfo = carInfo;
        this.services = services;
        this.masterName = masterName;
        this.masterAvatar = masterAvatar;
        this.done = done;
        this.stars = stars;
       
    }
}