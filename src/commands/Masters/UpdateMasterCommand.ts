export class UpdateMasterCommand {
    userId: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    age: number;
    experience: string;
    services: string;
    description: string;

    constructor(
        userId: number,
        firstName: string,
        lastName: string,
        phoneNumber: string,
        age: number,
        experience: string,
        services: string,
        description: string
    ) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.age = age;
        this.experience = experience;
        this.services = services;
        this.description = description;
    }
}