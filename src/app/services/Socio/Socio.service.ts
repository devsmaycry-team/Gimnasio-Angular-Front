import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socio } from '../../model/Socio';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { SocioResponse } from '../../model/ResponseDTO/SocioResponse';

@Injectable({
  providedIn: 'root'
})
export class SocioService {

  private apiServer = "";

  constructor(private httpClient: HttpClient) {
    this.apiServer = environment.apiUrl;
  }

  // =========================
  // OBTENER TODOS
  // =========================

  obtenerTodos(): Observable<Socio[]> {
    return this.httpClient.get<Socio[]>(
      `${this.apiServer}/api/socios`
    );
  }

  // =========================
  // OBTENER POR GIMNASIO
  // =========================

  obtenerPorGimnasio(id: number): Observable<SocioResponse[]> {
    return this.httpClient.get<SocioResponse[]>(
      `${this.apiServer}/api/socios/findbygym/${id}`
    );
  }

  // =========================
  // OBTENER POR ID
  // =========================

  obtenerPorId(id: number): Observable<Socio> {
    return this.httpClient.get<Socio>(
      `${this.apiServer}/api/socios/${id}`
    );
  }

  // =========================
  // CREAR
  // =========================

  crear(socio: Socio): Observable<Socio> {
    return this.httpClient.post<Socio>(
      `${this.apiServer}/api/socios`,
      socio
    );
  }

  // =========================
  // ACTUALIZAR
  // =========================

  actualizar(id: number, socio: Socio): Observable<Socio> {
    return this.httpClient.put<Socio>(
      `${this.apiServer}/api/socios/${id}`,
      socio
    );
  }

  // =========================
  // ELIMINAR
  // =========================

  eliminar(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.apiServer}/api/socios/${id}`
    );
  }
 }