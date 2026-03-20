import { Component } from '@angular/core';
import { GimnasioService } from '../../../services/Gimnasio/Gimnasio.service';
import { ActivatedRoute } from '@angular/router';
import { Gimnasio } from '../../../model/Gimnasio';
@Component({
  selector: 'app-info-gym',
  imports: [],
  templateUrl: './info-gym.component.html',
  styleUrl: './info-gym.component.css'
})
export class InfoGymComponent {

  
  constructor(private route: ActivatedRoute,private gimnasioService: GimnasioService){
    
  }
  gimnasio: Gimnasio | null = null;

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        console.log("ID recibido:", id);
        const gimnasioId = Number(id);
        this.gimnasioPorId(gimnasioId);
      }
    });
  }

  gimnasioPorId(id: number) {
    this.gimnasioService.obtenerPorId(id).subscribe({
      next: (data: Gimnasio) => {
        this.gimnasio = data;
        console.log('Gimnasio cargado:', data);
      },
      error: (err) => {
        console.error('Error al traer gimnasio:', err);
      }
    });
  }
}
