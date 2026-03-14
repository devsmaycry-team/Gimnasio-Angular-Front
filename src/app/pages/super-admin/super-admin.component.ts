import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-super-admin',
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './super-admin.component.html',
  styleUrl: './super-admin.component.css'
})
export class SuperAdminComponent {
  constructor(private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      console.warn("Sin token, redirigiendo al inicio...");
      this.router.navigate(['/']);
      return;
    }

    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
    } else {
      console.error("No se encontró el objeto 'user' en localStorage");
    }
  }

  getNombreUsuario(): string {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      return user.nombre || 'Administrador';
    }
    return 'Administrador';
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}
