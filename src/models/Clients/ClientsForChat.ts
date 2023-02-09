export class ClientsForChat {
    id: number;
    fullName: string;
    avatar: string;
    hasNewMessage: boolean;
    carInfo: string;
    phoneNumber: string;
    email: string;

    constructor(
        id: number,
        fullName: string,
        avatar: string,
        hasNewMessage: boolean,
        carInfo: string,
        phoneNumber: string,
        email: string
    ) {
        this.id = id;
        this.fullName = fullName;
        this.avatar = avatar;
        this.hasNewMessage = hasNewMessage;
        this.carInfo = carInfo;
        this.phoneNumber = phoneNumber;
        this.email = email;
       
    }
}