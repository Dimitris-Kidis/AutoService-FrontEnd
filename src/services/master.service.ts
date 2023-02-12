import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateMasterCommand } from 'src/commands/Masters/UpdateMasterCommand';
import { ClientsForChat } from 'src/models/Clients/ClientsForChat';
import { MasterHistoryRow } from 'src/models/Masters/MasterHistoryRow';
import { MasterInfoForClient } from 'src/models/Masters/MasterInfoForClient';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private _httpService: HttpClient) { }

  updateMaster(command: UpdateMasterCommand): Observable<any> {
    return this._httpService.put<any>("api/master/master", command);
  }
  
  getAllHistoryRows(masterId: number): Observable<MasterHistoryRow[]> {
    return this._httpService.get<MasterHistoryRow[]>(`api/master/history/${masterId}`);
  }

  getClientsForChats(masterId: number): Observable<ClientsForChat[]> {
    return this._httpService.get<ClientsForChat[]>(`api/master/clients-for-chat/${masterId}`);
  }

  getCurrentMasterInfo(masterId: number): Observable<MasterInfoForClient> {
    return this._httpService.get<MasterInfoForClient>(`api/master/master-info/${masterId}`);
  }
}
