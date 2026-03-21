import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { GimnasioService } from '../../../services/Gimnasio/Gimnasio.service';
import { Gimnasio } from '../../../model/Gimnasio';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard-general',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './dashboard-general.component.html',
  styleUrl: './dashboard-general.component.css'
})
export class DashboardGeneralComponent implements OnInit {
  
  gimnasios: Gimnasio[] = [];
  cantGimnasios: number = 0;

  // Variables para el Modal y Formulario
  mostrarFormulario = false;
  modoEdicion = false;
  form: Gimnasio = this.limpiarForm();

  constructor(private router: Router, private gimnasioService: GimnasioService) {}

  ngOnInit(): void {
    this.obtenerGimnasios();
  }

  obtenerGimnasios() {
    this.gimnasioService.obtenerTodos().subscribe({
      next: (data: Gimnasio[]) => {
        this.gimnasios = data;
        this.cantGimnasios = data.length;
      },
      error: (err) => console.error("Error al traer los gimnasios:", err)
    });
  }

  // --- Lógica del Formulario ---

  private limpiarForm(): Gimnasio {
    return { id: 0, nombre: '', direccion: '', telefono: '', email: '', codigoGym: '' };
  }

  abrirFormulario(gym?: Gimnasio) {
    if (gym) {
      this.modoEdicion = true;
      this.form = { ...gym };
    } else {
      this.modoEdicion = false;
      this.form = this.limpiarForm();
    }
    this.mostrarFormulario = true;
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
    this.form = this.limpiarForm();
  }

  guardar() {
    if (this.modoEdicion && this.form.id) {
      // ACTUALIZAR (Type Guard para el ID asegurado)
      this.gimnasioService.actualizar(this.form.id, this.form).subscribe({
        next: () => {
          this.obtenerGimnasios(); // Recargar tabla
          this.cerrarFormulario();
        },
        error: (err) => console.error("Error al actualizar:", err)
      });
    } else {
      // CREAR
      this.gimnasioService.crear(this.form).subscribe({
        next: () => {
          this.obtenerGimnasios(); // Recargar tabla
          this.cerrarFormulario();
        },
        error: (err) => console.error("Error al crear:", err)
      });
    }
  }
  eliminar() {
    if (this.form.id) {
      const confirmar = confirm(`¿Estás seguro de que deseas eliminar la sede "${this.form.nombre}"? Esta acción no se puede deshacer.`);
      
      if (confirmar) {
        this.gimnasioService.eliminar(this.form.id).subscribe({
          next: () => {
            console.log('Sede eliminada correctamente');
            this.obtenerGimnasios(); // Refrescamos la tabla
            this.cerrarFormulario(); // Cerramos el modal
          },
          error: (err) => {
            console.error("Error al eliminar el gimnasio:", err);
            alert("No se pudo eliminar la sede. Asegúrate de que no tenga socios o entrenadores vinculados.");
          }
        });
      }
    }
  }
  // --- Navegación ---
  accederSede(idGym: number) {
    this.router.navigate(['/vista-gimnasio', idGym]);
  }
}