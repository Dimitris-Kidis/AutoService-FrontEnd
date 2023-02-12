export class MasterHistoryRow {
    carInfo: string;
    services: string;
    clientName: string;
    clientAvatar: string;
    done: boolean;
    stars: number;

    constructor(
        carInfo: string,
        services: string,
        clientName: string,
        clientAvatar: string,
        done: boolean,
        stars: number
    ) {
        this.carInfo = carInfo;
        this.services = services;
        this.clientName = clientName;
        this.clientAvatar = clientAvatar;
        this.done = done;
        this.stars = stars;
       
    }
}