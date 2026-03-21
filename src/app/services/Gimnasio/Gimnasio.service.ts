import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Gimnasio } from '../../model/Gimnasio';

@Injectable({
  providedIn: 'root'
})
export class GimnasioService {
  
  private apiUrl = "";

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  // =========================
  // GET ALL
  // =========================
  obtenerTodos(): Observable<Gimnasio[]> {
    return this.httpClient.get<Gimnasio[]>(`${this.apiUrl}/gimnasios`);
  }

  // =========================
  // GET BY ID
  // =========================
  obtenerPorId(id: number): Observable<Gimnasio> {
    return this.httpClient.get<Gimnasio>(`${this.apiUrl}/gimnasios/${id}`);
  }

  // =========================
  // CREATE
  // =========================
  crear(gimnasio: Gimnasio): Observable<Gimnasio> {
    return this.httpClient.post<Gimnasio>(`${this.apiUrl}/gimnasios`, gimnasio);
  }

  // =========================
  // UPDATE
  // =========================
  actualizar(id: number, gimnasio: Gimnasio): Observable<Gimnasio> {
    return this.httpClient.put<Gimnasio>(
      `${this.apiUrl}/gimnasios/${id}`,
      gimnasio
    );
  }

  // =========================
  // DELETE
  // =========================
  eliminar(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/gimnasios/${id}`);
  }
}