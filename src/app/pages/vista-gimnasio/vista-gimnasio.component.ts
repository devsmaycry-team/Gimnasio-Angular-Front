import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-vista-gimnasio',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './vista-gimnasio.component.html',
  styleUrl: './vista-gimnasio.component.css'
})
export class VistaGimnasioComponent {


  gimnasioId: number = 0;
  cantidadSocios: number = 0;
  cantidadPlanes: number = 0;
  cantidadEntrenadores: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.gimnasioId = Number(id);
        console.log('ID recibido:', this.gimnasioId);
      }
    });
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
    this.router.navigate(['/super-admin']);
  }
}