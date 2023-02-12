import { Component } from '@angular/core';
import { MasterHistoryRow } from 'src/models/Masters/MasterHistoryRow';
import { AuthentificationService } from 'src/services/authentification.service';
import { MasterService } from 'src/services/master.service';

@Component({
  selector: 'app-master-history',
  templateUrl: './master-history.component.html',
  styleUrls: ['./master-history.component.scss']
})
export class MasterHistoryComponent {


  constructor(
    private _masterService: MasterService,
    private _authService: AuthentificationService
  ) {}

  history: MasterHistoryRow[];
  
  ngOnInit(): void {
    const id = this._authService.getUserId();
    this._masterService.getAllHistoryRows(id).subscribe(
      (history: MasterHistoryRow[]) => {
        this.history = history;
        console.log(history);
      }
    );
  }
}
