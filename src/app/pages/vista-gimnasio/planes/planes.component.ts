import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Plan } from '../../../model/Plan';
import { PlanRequest } from '../../../model/RequestDTO/PlanRequest';
import { Gimnasio } from '../../../model/Gimnasio';
import { PlanService } from '../../../services/Plan/Plan.service';
import { GimnasioService } from '../../../services/Gimnasio/Gimnasio.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-planes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './planes.component.html',
  styleUrl: './planes.component.css'
})
export class PlanesComponent implements OnInit {
  planes: any[] = [];
  gimnasios: Gimnasio[] = [];
  cargando: boolean = false;
  error: string | null = null;
  
  // Variable clave para saber qué planes mostrar
  gimnasioSeleccionadoId: number | null = null;

  mostrarFormulario: boolean = false;
  modoEdicion: boolean = false;
  form: Plan = this.inicializarForm();

  constructor(
    private planService: PlanService,
    private gimnasioService: GimnasioService,
    private route: ActivatedRoute
  ) {}

ngOnInit(): void {
  this.route.parent?.paramMap.subscribe(params => {
    const id = params.get('id');

    //console.log('ID recibido :', id);

    if (id) {
      this.gimnasioSeleccionadoId = Number(id);
      this.obtenerGimnasioPorId(this.gimnasioSeleccionadoId);
      this.cargarPlanes(this.gimnasioSeleccionadoId);
    }
  });
}

  // 1. Cargar la lista de gimnasios para el selector
  cargarGimnasios(): void {
    this.gimnasioService.obtenerTodos().subscribe({
      next: (data) => {
        this.gimnasios = data;
        // Opcional: Cargar planes del primer gimnasio por defecto
        if (this.gimnasios.length > 0) {
          this.gimnasioSeleccionadoId = this.gimnasios[0].id!;
          this.cargarPlanes(this.gimnasioSeleccionadoId);
        }
      },
      error: (err) => this.error = 'Error al cargar los gimnasios'
    });
  }

  obtenerGimnasioPorId(id: number): void {
    this.gimnasioService.obtenerPorId(id).subscribe({
      next: (gimnasio) => {


        this.gimnasios = [gimnasio];
        //console.log(gimnasio);
        this.form.gimnasio = gimnasio;
      },
      error: () => {
        this.error = 'No se pudo obtener el gimnasio';
      }
    });
  }

  // 2. Cargar planes filtrados por ID de gimnasio
  cargarPlanes(id: number): void {
    this.cargando = true;
    this.gimnasioSeleccionadoId = id; // Actualizamos el ID actual
    this.planService.obtenerPorGimnasio(id).subscribe({
      next: (data) => {
        this.planes = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los planes de este gimnasio';
        this.cargando = false;
      }
    });
  }

  guardar(): void {
    if (!this.validarFormulario()) return;

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
        // Al guardar, refrescamos los planes del gimnasio que estaba seleccionado
        if (this.gimnasioSeleccionadoId) {
          this.cargarPlanes(this.gimnasioSeleccionadoId);
        }
        this.cerrarFormulario();
      },
      error: (err) => this.error = 'Error al guardar el plan'
    });
  }

  // Al cambiar el select en el HTML, llamamos a esta función
  onGimnasioChange(event: any): void {
    const id = Number(event.target.value);
    if (id) {
      this.cargarPlanes(id);
    }
  }

  eliminar(id: number): void {
    if (confirm('¿Deseas eliminar este plan permanentemente?')) {
      this.planService.eliminar(id).subscribe({
        next: () => {
          if (this.gimnasioSeleccionadoId) {
            this.cargarPlanes(this.gimnasioSeleccionadoId);
          }
        },
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