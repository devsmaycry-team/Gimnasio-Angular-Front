import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Login } from '../../model/Login';
import { LoginService } from '../../services/login/login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode'; 
import { RolService } from '../../services/Rol/Rol.service';
import { Rol } from '../../model/Rol';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private rolService: RolService, private router: Router) {}

  loginData: Login = {
    email: '',
    password: ''
  };
  roles: Rol[] = [];

  ngOnInit(): void {
    this.obtenerRoles();
  }

  obtenerRoles() {
    this.rolService.obtenerTodos().subscribe({
      next: (data: Rol[]) => {
        this.roles = data;
        console.log("Roles cargados:", this.roles);
      },
      error: (err) => console.error("Error al traer los roles:", err)
    });
  }

  login() {
    console.log("Iniciando sesión...");

    this.loginService.login(this.loginData).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);

        const decodedToken: any = jwtDecode(res.token);
        // Convertimos el string "ROLE_ADMIN,ROLE_SUPERADMIN" en Array para manejar la jerarquía
        const rolesDelToken: string[] = decodedToken.roles ? decodedToken.roles.split(',') : [];
        
        console.log("Roles detectados:", rolesDelToken);

        this.loginService.me().subscribe({
          next: (user) => {
            localStorage.setItem('user', JSON.stringify(user));

            // --- LÓGICA DE JERARQUÍA ---
            let rolElegido = '';
            
            // 1. Verificamos primero el de mayor rango
            if (rolesDelToken.includes('ROLE_SUPERADMIN')) {
              rolElegido = 'ROLE_SUPERADMIN';
            } 
            // 2. Si no es superadmin, verificamos si es admin
            else if (rolesDelToken.includes('ROLE_ADMIN')) {
              rolElegido = 'ROLE_ADMIN';
            } 
            // 3. Cualquier otro rol (Socio, etc.)
            else {
              rolElegido = rolesDelToken[0];
            }

            const rolEncontrado = this.roles.find(r => r.cargo === rolElegido);

            if (rolEncontrado) {
              const nombreUsuario = user.persona?.nombre || 'Usuario';
              alert(`¡Bienvenido ${nombreUsuario}!`);
              
              // --- TRANSFORMACIÓN DE RUTA ---
              // Convertimos "ROLE_SUPERADMIN" -> "super-admin"
              // Convertimos "ROLE_ADMIN" -> "admin"
              const ruta = rolEncontrado.cargo
                .replace('ROLE_', '')
                .toLowerCase()
                .replace('superadmin', 'super-admin'); // Ajuste específico para la ruta super-admin
              
              console.log(`Redirigiendo a /${ruta} por jerarquía: ${rolElegido}`);
              this.router.navigate([`/${ruta}`]);
            } else {
              console.warn("Rol no reconocido.");
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
}