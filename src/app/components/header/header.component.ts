import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  UpdateConsultationCommand
} from 'src/commands/Consultations/UpdateConsultationCommand';
import {
  CreateMessageCommand
} from 'src/commands/Messages/CreateMessageCommand';
import {
  UserForAuthenticationDto
} from 'src/models/Auth/auth';
import {
  IsThereConsultation
} from 'src/models/Clients/IsThereConsultation';
import {
  SeenMessage
} from 'src/models/Messages/SeenMessage';
import {
  AuthentificationService
} from 'src/services/authentification.service';
import {
  ClientService
} from 'src/services/client.service';
import {
  CommonService
} from 'src/services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private _authService: AuthentificationService,
    private _router: Router,
    private _commonService: CommonService,
    private _clientSerivce: ClientService
  ) {}

  isLoggedIn: boolean = false;
  role: string;

  consultation: boolean = false;

  name: string;
  avatar: string;
  async ngOnInit() {
    this.isLoggedIn = this._authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.name = this._authService.getUserName();
      this.role = this._authService.userRole();
    }

    if (this.role == 'Client') {
      this._clientSerivce.getIsThereConsultation(this._authService.getUserId(), false).subscribe(
        (is: IsThereConsultation) => {
          this.consultation = is.isThereConsultation;
        }
      );
    } else if (this.role == 'Master') {
      this._clientSerivce.getIsThereConsultation(this._authService.getUserId(), true).subscribe(
        (is: IsThereConsultation) => {
          this.consultation = is.isThereConsultation;
        }
      );
    }

  }

  logout(): void {
    localStorage.removeItem('token');
    this._router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}


function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
