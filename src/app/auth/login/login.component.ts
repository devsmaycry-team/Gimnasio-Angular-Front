import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Login } from '../../model/Login';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private loginService: LoginService, private router: Router){

  }

  loginData: Login = {
    email: '',
    password: ''
  };
  

  login() {
    console.log("Datos enviados:", this.loginData);

    this.loginService.login(this.loginData).subscribe({
      next: (res) => {
        console.log("Respuesta del backend:", res);

        localStorage.setItem('token', res.token);
        console.log("Token guardado:", localStorage.getItem('token'));

        // 🔽 LLAMAMOS A /me
        this.loginService.me().subscribe({
          next: (user) => {
            console.log("Usuario autenticado:", user);

            // si querés podés guardarlo también
            localStorage.setItem('user', JSON.stringify(user));

            this.router.navigate(['/register']);
          },
          error: (err) => {
            console.error("Error obteniendo usuario:", err);
          }
        });
      },
      error: (err) => {
        console.error("Error en login:", err);
        console.error("Mensaje backend:", err.error);
      }
    });
  }

}
