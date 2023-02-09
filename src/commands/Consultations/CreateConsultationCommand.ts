export class CreateConsultationCommand {
    clientId: number;
    masterId: number;
    carId: number;

    constructor(
        clientId: number,
        masterId: number,
        carId: number
    ) {
        this.clientId = clientId;
        this.masterId = masterId;
        this.carId = carId;
        
    }
}