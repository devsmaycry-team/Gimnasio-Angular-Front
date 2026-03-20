import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-super-admin',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './super-admin.component.html',
  styleUrl: './super-admin.component.css'
})
export class SuperAdminComponent implements OnInit {

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {

    // 🔐 Verificar login
    if (!this.loginService.isLoggedIn()) {
      console.warn("Sin token, redirigiendo...");
      this.router.navigate(['/']);
      return;
    }

    // 🔐 Verificar rol
    const rol = this.loginService.getRolPrincipal();

    if (rol !== 'ROLE_SUPERADMIN') {
      console.warn("Acceso denegado. No es SUPERADMIN");
      this.router.navigate(['/']);
      return;
    }

    console.log("Acceso permitido a SUPERADMIN");
  }

  getNombreUsuario(): string {
    const user = this.loginService.getUser();
    return user?.persona?.nombre || 'Administrador';
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}