export class CreateMessageCommand {
    sender: number;
    receiver: number;
    text: string;

    constructor(
        sender: number,
        receiver: number,
        text: string
    ) {
        this.sender = sender;
        this.receiver = receiver;
        this.text = text;
    }
}