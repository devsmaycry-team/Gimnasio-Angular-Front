import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntrenadorResponse } from '../../model/ResponseDTO/EntrenadorResponse';

@Injectable({
  providedIn: 'root'
})
export class EntrenadorService {

  private apiUrl = 'http://localhost:8080/entrenadores';

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<EntrenadorResponse[]> {
    return this.http.get<EntrenadorResponse[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<EntrenadorResponse> {
    return this.http.get<EntrenadorResponse>(`${this.apiUrl}/${id}`);
  }

  crear(body: any): Observable<EntrenadorResponse> {
    return this.http.post<EntrenadorResponse>(this.apiUrl, body);
  }

  actualizar(id: number, body: any): Observable<EntrenadorResponse> {
    return this.http.put<EntrenadorResponse>(`${this.apiUrl}/${id}`, body);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}