import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateConsultationCommand } from 'src/commands/Consultations/CreateConsultationCommand';
import { CreateCarCommand } from 'src/models/Cars/CreateCarCommand';
import { ClientHistoryRow } from 'src/models/Clients/ClientHistoryRow';
import { MasterInfoForClient } from 'src/models/Masters/MasterInfoForClient';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private _httpService: HttpClient) { }

  createConsultation(command: CreateConsultationCommand): Observable<any> {
  return this._httpService.post<any>("api/client/consultation", command);
  }

  createCar(command: CreateCarCommand): Observable<any> {
  return this._httpService.post<any>("api/client/car", command);
  }

  getClientHistoryRows(clientId: number): Observable<ClientHistoryRow[]> {
    return this._httpService.get<ClientHistoryRow[]>(`api/client/history/${clientId}`);
  }

  getCurrentMasterInfo(clientId: number): Observable<MasterInfoForClient> {
    return this._httpService.get<MasterInfoForClient>(`api/client/master-info/${clientId}`);
  }
}
