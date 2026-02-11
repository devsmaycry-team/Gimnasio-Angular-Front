import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-gestion-socios',
  imports: [],
  templateUrl: './gestion-socios.component.html',
  styleUrl: './gestion-socios.component.css'
})
export class GestionSociosComponent {
  constructor(private router: Router) {}
  abrirModalRegistro(){
    this.router.navigate(['/register']);
  }
}
