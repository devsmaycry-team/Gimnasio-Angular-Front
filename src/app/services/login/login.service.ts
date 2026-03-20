import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Login } from '../../model/Login';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private appiServer = "";

  constructor(private httpClient: HttpClient) {
    this.appiServer = environment.apiUrl;
  }

  // =========================
  // 🔐 AUTENTICACIÓN
  // =========================

  login(data: Login) {
    return this.httpClient.post<any>(
      this.appiServer + "/api/auth/login",
      data
    );
  }

  me() {
    return this.httpClient.get<any>(
      this.appiServer + "/api/auth/me"
    );
  }

  // =========================
  // 💾 TOKEN
  // =========================

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('rol');
  }

  // =========================
  // 👤 USUARIO
  // =========================

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // =========================
  // 🎭 ROLES (DESDE JWT)
  // =========================

  getRoles(): string[] {
    const token = this.getToken();
    if (!token) return [];

    try {
      const decoded: any = jwtDecode(token);
      return decoded.roles ? decoded.roles.split(',') : [];
    } catch (error) {
      console.error('Error al decodificar token:', error);
      return [];
    }
  }

  getRolPrincipal(): string | null {
    const roles = this.getRoles();

    if (roles.includes('ROLE_SUPERADMIN')) return 'ROLE_SUPERADMIN';
    if (roles.includes('ROLE_ADMIN')) return 'ROLE_ADMIN';

    return roles.length ? roles[0] : null;
  }

  tieneRol(rol: string): boolean {
    return this.getRoles().includes(rol);
  }

  // =========================
  // 🔎 ESTADO DE SESIÓN
  // =========================

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}