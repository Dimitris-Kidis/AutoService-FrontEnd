import { Component, OnInit } from '@angular/core';
import { ClientHistoryRow } from 'src/models/Clients/ClientHistoryRow';
import { AuthentificationService } from 'src/services/authentification.service';
import { ClientService } from 'src/services/client.service';

@Component({
  selector: 'app-client-history',
  templateUrl: './client-history.component.html',
  styleUrls: ['./client-history.component.scss']
})
export class ClientHistoryComponent implements OnInit{

  constructor(
    private _clientService: ClientService,
    private _authService: AuthentificationService
  ) {}

  history: ClientHistoryRow[];
  
  ngOnInit(): void {
    const id = this._authService.getUserId();
    this._clientService.getClientHistoryRows(id).subscribe(
      (history: ClientHistoryRow[]) => {
        this.history = history;
        console.log(history);
      }
    );
  }

}
