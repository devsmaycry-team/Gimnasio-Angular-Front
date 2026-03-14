import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-general',
  imports: [],
  templateUrl: './dashboard-general.component.html',
  styleUrl: './dashboard-general.component.css'
})
export class DashboardGeneralComponent {
  constructor(private router: Router) {}
  
  //Funciona para llamar al dashBoard de un gym en especifico
  accederSede(idGym: number) {
    console.log("Accediendo a la sede con ID:", idGym);
    
    // Opcional: Guardar en localStorage para persistencia si es necesario
    localStorage.setItem('selectedGymId', idGym.toString());
    
    this.router.navigate(['/admin/gym-details', idGym]);
  }
  
}
