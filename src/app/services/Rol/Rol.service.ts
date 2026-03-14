import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Rol } from '../../model/Rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private appiServer = "";

  constructor(private httpClient: HttpClient) {
    this.appiServer = environment.apiUrl;
  }

  obtenerTodos():Observable<any>{
      return this.httpClient.get<Rol[]>( this.appiServer + "/rol/todos");
  }


}
