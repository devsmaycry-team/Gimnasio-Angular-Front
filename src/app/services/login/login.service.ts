import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Login } from '../../model/Login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private appiServer = "";
  constructor(private httpClient: HttpClient) {
    this.appiServer = environment.apiUrl;
  }

  //iniciar sesion
  login(data: Login) {
    return this.httpClient.post<any>(
      this.appiServer + "/api/auth/login",
      data
    );
  }

  //Devuelve datos del usuario
  me() {
    return this.httpClient.get<any>(this.appiServer + "/api/auth/me");
  }
}
