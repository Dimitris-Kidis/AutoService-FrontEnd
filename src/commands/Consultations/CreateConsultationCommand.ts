export class CreateConsultationCommand {
    clientId: number;
    masterId: number;

    constructor(
        clientId: number,
        masterId: number,
    ) {
        this.clientId = clientId;
        this.masterId = masterId;
        
    }
}