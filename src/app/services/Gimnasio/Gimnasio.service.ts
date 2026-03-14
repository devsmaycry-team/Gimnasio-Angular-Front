import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GimnasioService {
  
  private appiServer = "";
  constructor(private httpClient: HttpClient) {
    this.appiServer = environment.apiUrl;
  }



}
