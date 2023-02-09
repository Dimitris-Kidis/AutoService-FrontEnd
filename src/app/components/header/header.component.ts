import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UpdateConsultationCommand } from 'src/commands/Consultations/UpdateConsultationCommand';
import { CreateMessageCommand } from 'src/commands/Messages/CreateMessageCommand';
import { UserForAuthenticationDto } from 'src/models/Auth/auth';
import { SeenMessage } from 'src/models/Messages/SeenMessage';
import { AuthentificationService } from 'src/services/authentification.service';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  constructor(
    private _authService: AuthentificationService,
    private _router: Router,
    private _commonService: CommonService
  ){}

  isLoggedIn: boolean;

  name: string;
  avatar: string;
  ngOnInit(): void {
    this.isLoggedIn = this._authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.name = this._authService.getUserName();
      this.avatar = this._authService.getUserAvatar();
    }

    this._commonService.getAllSeenMessages(1,2).subscribe(
      (messages: SeenMessage[]) => {
        console.log(messages);
      }
    )
  }

  logout(): void {
    localStorage.removeItem('token');
    this._router.navigate(['/login']).then(() => {
      window.location.reload();
   });
  }
}
