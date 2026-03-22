import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../../model/Usuario';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiServer = '';

  constructor(private httpClient: HttpClient) {
    this.apiServer = environment.apiUrl;
  }

  // =========================
  // OBTENER TODOS
  // =========================

  obtenerTodos(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(
      `${this.apiServer}/api/usuario/todos`
    );
  }

  // =========================
  // OBTENER POR ID
  // =========================

  obtenerPorId(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(
      `${this.apiServer}/api/usuario/buscar/${id}`
    );
  }

  // =========================
  // CREAR
  // =========================

  crear(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(
      `${this.apiServer}/api/usuario/crear`,
      usuario
    );
  }

  // =========================
  // ACTUALIZAR
  // =========================

  actualizar(id: number, usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(
      `${this.apiServer}/api/usuario/crear`,
      usuario
    );
  }

  // =========================
  // ELIMINAR
  // =========================

  eliminar(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.apiServer}/api/usuario/borrar/${id}`
    );
  }

}
// No hay editar() ni toggleActivo() porque el backend no los tiene todavía.problema de yamil del futuro

//lo modifique para usar el patron de diseño singleton del environment (Facu con depresion el dia: 21/3/2026 23:55hs)