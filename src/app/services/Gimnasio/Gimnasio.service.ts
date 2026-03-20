import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Gimnasio } from '../../model/Gimnasio';

@Injectable({
  providedIn: 'root'
})
export class GimnasioService {
  
  private appiServer = "";
  constructor(private httpClient: HttpClient) {
    this.appiServer = environment.apiUrl;
  }

  obtenerTodos(): Observable<any> {
    return this.httpClient.get<Gimnasio[]>(this.appiServer + "/gimnasios");
  }

}
