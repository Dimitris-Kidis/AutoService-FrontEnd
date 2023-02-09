export class UpdateConsultationCommand {
    role: boolean;
    clientId: number;
    masterId: number;
    done: boolean;
    rated: boolean;
    stars: number;
    comment: string;

    constructor(
        role: boolean,
        clientId: number,
        masterId: number,
        done: boolean,
        rated: boolean,
        stars: number,
        comment: string
    ) {
        this.role = role;
        this.clientId = clientId;
        this.masterId = masterId;
        this.done = done;
        this.rated = rated;
        this.stars = stars;
        this.comment = comment;
        
    }
}