import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Gimnasio-front';
   constructor(private router: Router) {}

   abrirModalSocio(){
    this.router.navigate(['/gestion-socios']);
  }

}
