import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GimnasioService } from '../../../services/Gimnasio/Gimnasio.service';
import { Gimnasio } from '../../../model/Gimnasio';
@Component({
  selector: 'app-dashboard-general',
  imports: [],
  templateUrl: './dashboard-general.component.html',
  styleUrl: './dashboard-general.component.css'
})
export class DashboardGeneralComponent {
  constructor(private router: Router, private gimnasioService: GimnasioService) {}

  ngOnInit(): void{
    this.obtenerGimnasios();
  }
  
  gimnasios: Gimnasio[]=[];
  cantGimnasios:number = 0;
  obtenerGimnasios() {
      this.gimnasioService.obtenerTodos().subscribe({
        next: (data: Gimnasio[]) => {
          this.gimnasios = data;
          this.cantGimnasios = data.length;
          console.log(this.gimnasios)
        },
        error: (err) => console.error("Error al traer los gimnasios:", err)
      });
  }
  //Funciona para llamar al dashBoard de un gym en especifico
  accederSede(idGym: number) {
    console.log("Accediendo a la sede con ID:", idGym);
    
    // Opcional: Guardar en localStorage para persistencia si es necesario
    //localStorage.setItem('selectedGymId', idGym.toString());
    
    //this.router.navigate(['/admin/gym-details', idGym]);
  }
  
}
