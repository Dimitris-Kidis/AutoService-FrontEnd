import { Component, OnInit } from '@angular/core';
import { UserForAuthenticationDto } from 'src/models/Auth/auth';
import { AuthentificationService } from 'src/services/authentification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  constructor(
    private _authService: AuthentificationService
  ){}

  isLoggedIn: boolean;

  ngOnInit(): void {
    // var dto: UserForAuthenticationDto = {
    //   email: 'client1@mail.ru',
    //   password: '!Qwerty7'
    // } 
    // this._authService.loginUser(dto).subscribe(
    //   (res: any) => {
    //     localStorage.setItem("token", res.token);
    //     console.log('GOT IT ' + res.token);
    //   });
    this.isLoggedIn = this._authService.isLoggedIn();
    
  }
}
