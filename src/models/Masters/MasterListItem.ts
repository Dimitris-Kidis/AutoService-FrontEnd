export class MasterListItem {
    id: number;
    rating: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    age: number;
    avatar: string;
    experience: string;
    services: string;
    description: string;

    constructor(
        id: number,
        rating: number,
        firstName: string,
        lastName: string,
        phoneNumber: string,
        age: number,
        avatar: string,
        experience: string,
        services: string,
        description: string
    ) {
        this.id = id;
        this.rating = rating;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.age = age;
        this.avatar = avatar;
        this.experience = experience;
        this.services = services;
        this.description = description;
    }
}