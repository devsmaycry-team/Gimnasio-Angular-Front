import { Component } from '@angular/core';
import { GimnasioService } from '../../../services/Gimnasio/Gimnasio.service';
import { ActivatedRoute } from '@angular/router';
import { Gimnasio } from '../../../model/Gimnasio';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-info-gym',
  imports: [CommonModule,FormsModule],
  templateUrl: './info-gym.component.html',
  styleUrl: './info-gym.component.css'
})
export class InfoGymComponent {

  
  constructor(private route: ActivatedRoute,private gimnasioService: GimnasioService){
    
  }
  gimnasio: Gimnasio | null = null;
  editando: boolean = false;
  gimnasioEdit: Gimnasio | null = null;
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

  activarEdicion() {
  this.editando = true;
  this.gimnasioEdit = { ...this.gimnasio! }; // copia
}

  guardar() {
    if (this.gimnasio && this.gimnasio.id && this.gimnasioEdit) {
      this.gimnasioService
        .actualizar(this.gimnasio.id, this.gimnasioEdit)
        .subscribe({
          next: (data) => {
            this.gimnasio = data;
            this.editando = false;
          },
          error: (err) => console.error(err)
        });
    }
  }

  cancelar() {
    this.editando = false;
    this.gimnasioEdit = null;
  }
}
