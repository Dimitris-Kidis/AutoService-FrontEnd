export class SeenMessage {
    senderId: number;
    receiverId: number;
    text: string;
    dateTime: string;
    
    constructor(
        senderId: number,
        receiverId: number,
        text: string,
        dateTime: string
    ) {
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.text = text;
        this.dateTime = dateTime;
        
    }
}