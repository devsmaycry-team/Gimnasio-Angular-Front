import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Plan } from '../../model/Plan';
import { PlanRequest } from '../../model/RequestDTO/PlanRequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  private apiServer = ""; // Corregido el typo 'appiServer' a 'apiServer'

  constructor(private httpClient: HttpClient) {
    this.apiServer = environment.apiUrl;
  }

  // =========================
  // OBTENER TODOS
  // =========================
  obtenerTodos(): Observable<Plan[]> {
    return this.httpClient.get<Plan[]>(`${this.apiServer}/api/planes`);
  }

  // =========================
  // OBTENER POR ID
  // =========================
  obtenerPorId(id: number): Observable<Plan> {
    return this.httpClient.get<Plan>(`${this.apiServer}/api/planes/${id}`);
  }

  // =========================
  // CREAR 
  // =========================
  crear(planDto: PlanRequest): Observable<Plan> {
    return this.httpClient.post<Plan>(`${this.apiServer}/api/planes`, planDto);
  }

  // =========================
  // ACTUALIZAR
  // =========================
  actualizar(id: number, planDto: PlanRequest): Observable<Plan> {
    return this.httpClient.put<Plan>(`${this.apiServer}/api/planes/${id}`, planDto);
  }

  // =========================
  // ELIMINAR
  // =========================
  eliminar(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiServer}/api/planes/${id}`);
  }

}