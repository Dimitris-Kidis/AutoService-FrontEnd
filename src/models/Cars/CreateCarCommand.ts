export class CreateCarCommand {
    clientId: number;
    brand: string;
    model: string;
    year: string;
    engine: string;
    driveType: string;
    transmission: string;
    mileage: string;
    services: string;


    constructor(
        clientId: number,
        brand: string,
        model: string,
        year: string,
        engine: string,
        driveType: string,
        transmission: string,
        mileage: string,
        services: string
    ) {
        this.clientId = clientId;
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.engine = engine;
        this.driveType = driveType;
        this.transmission = transmission;
        this.mileage = mileage;
        this.services = services;
       
    }
}