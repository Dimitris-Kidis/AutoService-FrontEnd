import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor(
    private _httpService: HttpClient,
    private _authService: AuthentificationService) { }

  uploadPhoto = (file: File): Observable<any>  => {
    const formData = new FormData(); 
    const token: any = localStorage.getItem('token');
    console.log(token.id);
    var id: number = this._authService.getUserId();
    formData.append("Files", file);
    formData.append("UserId", `${id}`);
    return this._httpService.post<any>(`api/avatars`, formData);
  }
}
