import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Plan } from '../../../model/Plan';
import { PlanRequest } from '../../../model/RequestDTO/PlanRequest';
import { Gimnasio } from '../../../model/Gimnasio';
import { PlanService } from '../../../services/Plan/Plan.service';
import { GimnasioService } from '../../../services/Gimnasio/Gimnasio.service';

@Component({
  selector: 'app-planes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './planes.component.html',
  styleUrl: './planes.component.css'
})
export class PlanesComponent implements OnInit {
  
  planes: any[] = []; // Usamos any porque el back manda gimnasio_id en lugar del objeto gimnasio
  gimnasios: Gimnasio[] = [];
  cargando: boolean = false;
  error: string | null = null;
  
  mostrarFormulario: boolean = false;
  modoEdicion: boolean = false;
  form: Plan = this.inicializarForm();

  constructor(
    private planService: PlanService,
    private gimnasioService: GimnasioService
  ) {}

  ngOnInit(): void {
    // 1. Cargamos primero los gimnasios para tener los nombres listos
    this.cargarGimnasios();
  }

  // --- Carga de datos ---

  cargarGimnasios(): void {
    this.gimnasioService.obtenerTodos().subscribe({
      next: (data) => {
        this.gimnasios = data;
        // 2. Solo cuando tenemos los gimnasios, traemos los planes
        this.cargarPlanes();
      },
      error: (err) => {
        this.error = 'Error al cargar los gimnasios base';
        console.error(err);
      }
    });
  }

  cargarPlanes(): void {
    this.cargando = true;
    this.planService.obtenerTodos().subscribe({
      next: (data) => {
        this.planes = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al cargar la lista de planes';
        this.cargando = false;
      }
    });
  }

  // --- Operaciones CRUD ---

  guardar(): void {
    if (!this.validarFormulario()) return;

    // Mapeo al DTO que espera el Backend
    const dto: PlanRequest = {
      id: this.modoEdicion ? this.form.id : undefined,
      nombre: this.form.nombre,
      precio: this.form.precio,
      duracion_dias: this.form.duracion_dias,
      clases_incluidas: this.form.clases_incluidas,
      gimnasio_id: this.form.gimnasio?.id ?? 0
    };

    const operacion = (this.modoEdicion && dto.id)
      ? this.planService.actualizar(dto.id, dto)
      : this.planService.crear(dto);

    operacion.subscribe({
      next: () => {
        this.cargarPlanes();
        this.cerrarFormulario();
      },
      error: (err) => {
        this.error = 'No se pudo guardar el plan. Verifica los datos.';
        console.error(err);
      }
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Deseas eliminar este plan permanentemente?')) {
      this.planService.eliminar(id).subscribe({
        next: () => this.cargarPlanes(),
        error: () => this.error = 'No se pudo eliminar el plan'
      });
    }
  }

  // --- Gestión de UI ---

  abrirCrear(): void {
    this.modoEdicion = false;
    this.form = this.inicializarForm();
    this.mostrarFormulario = true;
  }

  abrirEditar(plan: any): void {
    this.modoEdicion = true;
    // Si el backend mandó gimnasio_id, reconstruimos el objeto gimnasio para el formulario
    this.form = { 
      ...plan, 
      gimnasio: this.gimnasios.find(g => g.id === plan.gimnasio_id) || { id: plan.gimnasio_id, nombre: '' }
    };
    this.mostrarFormulario = true;
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.error = null;
  }

  // --- Helpers ---

getNombreGimnasio(plan: any): string {
  // 1. Verificación de seguridad: ¿el objeto plan existe?
  if (!plan) {
    return 'Cargando...';
  }

  // 2. Si el backend mandara el objeto anidado
  if (plan.gimnasio && plan.gimnasio.nombre) {
    return plan.gimnasio.nombre;
  }

  // 3. Si viene el id (tu caso actual), buscamos en la lista cargada
  if (plan.gimnasio_id) {
    const gym = this.gimnasios.find(g => g.id === plan.gimnasio_id);
    return gym ? gym.nombre : `ID: ${plan.gimnasio_id}`;
  }

  return 'Sin asignar';
}
  private inicializarForm(): Plan {
    return {
      nombre: '',
      precio: 0,
      duracion_dias: 30,
      clases_incluidas: 0,
      gimnasio: { id: 0, nombre: '' } as Gimnasio 
    };
  }

  private validarFormulario(): boolean {
    if (!this.form.nombre || this.form.precio <= 0 || !this.form.gimnasio?.id) {
      this.error = 'Todos los campos son obligatorios, incluyendo el gimnasio.';
      return false;
    }
    return true;
  }
}