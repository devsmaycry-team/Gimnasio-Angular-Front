import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';

// Modelos y Servicios
import { Login } from '../model/Login';
import { Rol } from '../model/Rol';
import { RolService } from '../services/Rol/Rol.service';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-menu-principal',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './menu-principal.component.html',
  styleUrl: './menu-principal.component.css'
})
export class MenuPrincipalComponent implements OnInit {

  // --- Propiedades de Control de Interfaz ---
  mostrarLogin: boolean = false;
  vistaActual: 'login' | 'forgot' = 'login'; // Controla qué formulario se ve en la tarjeta
  showSuccessModal: boolean = false;        // Modal de confirmación de envío

  // --- Datos de Formularios ---
  loginData: Login = {
    email: '',
    password: ''
  };
  emailReset: string = ''; // Para la recuperación de contraseña
  roles: Rol[] = [];

  constructor(
    private router: Router, 
    private rolService: RolService, 
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.obtenerRoles();
  }

  // --- Gestión de Modales ---
  abrirModal() {
    this.vistaActual = 'login'; // Resetear a login al abrir
    this.mostrarLogin = true;
  }

  cerrarModal(event: any) {
    // Cerramos solo si se hace click en el fondo oscuro (overlay)
    this.mostrarLogin = false;
  }

  // --- Lógica de Negocio: Autenticación ---
  login() {
    console.log("Iniciando sesión...");

    this.loginService.login(this.loginData).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);

        const decodedToken: any = jwtDecode(res.token);
        const rolesDelToken: string[] = decodedToken.roles ? decodedToken.roles.split(',') : [];

        this.loginService.me().subscribe({
          next: (user) => {
            localStorage.setItem('user', JSON.stringify(user));
            this.mostrarLogin = false; // Cerramos el modal al tener éxito

            // Determinar jerarquía de redirección
            let rolElegido = '';
            if (rolesDelToken.includes('ROLE_SUPERADMIN')) {
              rolElegido = 'ROLE_SUPERADMIN';
            } else if (rolesDelToken.includes('ROLE_ADMIN')) {
              rolElegido = 'ROLE_ADMIN';
            } else {
              rolElegido = rolesDelToken[0];
            }

            const rolEncontrado = this.roles.find(r => r.cargo === rolElegido);

            if (rolEncontrado) {
              const nombreUsuario = user.persona?.nombre || 'Usuario';
              alert(`¡Bienvenido ${nombreUsuario}!`);
              
              const ruta = rolEncontrado.cargo
                .replace('ROLE_', '')
                .toLowerCase()
                .replace('superadmin', 'super-admin');
              
              this.router.navigate([`/${ruta}`]);
            } else {
              this.router.navigate(['/register']);
            }
          },
          error: (err) => {
            console.error("Error al obtener perfil:", err);
            alert("Error al cargar datos de perfil.");
          }
        });
      },
      error: (err) => {
        if (err.status === 401 || err.status === 403) {
          alert("Correo o contraseña incorrectos.");
        } else {
          alert("Error en el servidor.");
        }
      }
    });
  }

  // --- Lógica de Negocio: Recuperación ---
  enviarEnlace() {
    if (!this.emailReset) {
      alert("Por favor, ingresá un correo válido.");
      return;
    }
    // Aquí llamarías a tu servicio: this.loginService.resetPassword(this.emailReset)...
    console.log("Enviando enlace a:", this.emailReset);
    this.showSuccessModal = true;
  }

  finalizarRecuperacion() {
    this.showSuccessModal = false;
    this.mostrarLogin = false; // Cerramos todo el flujo
    this.emailReset = '';      // Limpiamos el campo
  }

  // --- Helpers de Sesión ---
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getNombreUsuario(): string {
    const userJson = localStorage.getItem('user');
    
    if (userJson) {
      const user = JSON.parse(userJson);
      return user.persona?.nombre || 'Perfil';
      
    }
    
    return 'Perfil';
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/menu']); // Redirigir a inicio al salir
  }

  obtenerRoles() {
    this.rolService.obtenerTodos().subscribe({
      next: (data: Rol[]) => {
        this.roles = data;
      },
      error: (err) => console.error("Error al traer los roles:", err)
    });
  }
}