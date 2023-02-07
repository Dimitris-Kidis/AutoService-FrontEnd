import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ChangePasswordDto, RegistrationResponseDto, UserForAuthenticationDto, UserForRegistrationDto } from 'src/models/Auth/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private _authChangeSub = new Subject<boolean>()
  public authChanged = this._authChangeSub.asObservable();

  constructor(private _httpService: HttpClient,
    private router: Router,
    private activeRoute: ActivatedRoute) { }

  sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this._authChangeSub.next(isAuthenticated);
  }

  loginUser(dto: UserForAuthenticationDto): Observable<any> {
    return this._httpService.post<any>("api/auth/login", dto);
  }

  registerUser(dto: UserForRegistrationDto): Observable<any> {
    return this._httpService.post<RegistrationResponseDto>("api/auth/registration", dto);
  }

  changePassword(dto: ChangePasswordDto): Observable<any> {
    return this._httpService.post<ChangePasswordDto>("api/auth/password-reset", dto);
  }

  logOut(): Observable<any> {
    localStorage.removeItem('token');
    return this._httpService.post("api/auth/logout", {});
  }

  isLoggedIn() {
    const token: any = localStorage.getItem('token'); // get token from local storage
    if (token) {
      const payload = atob(token.split('.')[1]); // decode payload of token
      const parsedPayload = JSON.parse(payload); // convert payload into an Object
      return parsedPayload.exp > Date.now() / 1000; // check if token is expired
    }
    else {
      return false;
    }
  }

  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }

  getUserId(): number {
    const token: any = localStorage.getItem('token');
    // console.log(this.parseJwt(token));
    return parseInt(this.parseJwt(token).id);
  }

  // getUserdata (): Observable<User> {
  //   const token: any = localStorage.getItem('token');
  //   var id:string = this.parseJwt(token).id;
  //   return this._httpService.get<User>(`api/auth/user-data/${id}`);
  // }

  userRole(): string {
    const token: any = localStorage.getItem('token');
    // console.log(this.parseJwt(token));
    return this.parseJwt(token).role == false ? 'Client' : 'Master';
  }

  parseJwt (token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

  getStudentsClassId(): number{
    const token: any = localStorage.getItem('token');
    var classId: number = this.parseJwt(token).classId;
    // console.log(classId);
    return classId;
  }

  getStudentId(): number{
    const token: any = localStorage.getItem('token');
    var studentId: number = this.parseJwt(token).studentId;
    // console.log(studentId);
    return studentId;
  }
}
