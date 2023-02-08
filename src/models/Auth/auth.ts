import { HttpHeaders } from "@angular/common/http";

export interface AuthResponseDto {
    isAuthSuccessful: boolean;
    errorMessage: string;
    token: string;
}

export interface UserForAuthenticationDto {
    email: string;
    password: string;
}

export interface ChangePasswordDto {
    userId: number;
    oldPassword: string;
    newPassword: string;
}

export interface BearerToken {
    accessToken: string;
}

export interface UserForRegistrationDto {
    role: boolean,
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    age: number,
    password: string,
    experience: string | null,
    services: string | null,
    description: string | null
}

export interface RegistrationResponseDto {
    isSuccessfulRegistration: boolean;
    errros: string[];
}

export const headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'key': 'x-api-key',
    'value': 'NNctr6Tjrw9794gFXf3fi6zWBZ78j6Gv3UCb3y0x',

});