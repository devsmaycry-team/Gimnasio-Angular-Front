import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Gimnasio } from '../../../model/Gimnasio';
import { EntrenadorResponse } from '../../../model/ResponseDTO/EntrenadorResponse';
import { EntrenadorService } from '../../../services/Entrenador/Entrenador.service';
import { GimnasioService } from '../../../services/Gimnasio/Gimnasio.service';
import { UsuarioService } from '../../../services/Usuario/Usuario.service';
import { ActivatedRoute } from '@angular/router';
import { UsuarioResponse } from '../../../model/ResponseDTO/UsuarioResponse';

@Component({
  selector: 'app-entrenadores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './entrenadores.component.html',
  styleUrl: './entrenadores.component.css'
})
export class EntrenadoresComponent implements OnInit {

  entrenadores: EntrenadorResponse[] = [];
  usuarios: UsuarioResponse[] = [];
  gimnasio: Gimnasio | null = null;
  cargando: boolean = false;
  error: string = '';
  mostrarFormulario: boolean = false;
  modoEdicion: boolean = false;
  entrenadorSeleccionado: EntrenadorResponse | null = null;

  form: {
    usuario_id: number | null;
    gimnasio_id: number | null;
    especialidad: string;
    matricula: string;
  } = {
    usuario_id: null,
    gimnasio_id: null,
    especialidad: '',
    matricula: ''
  };

  constructor(
    private entrenadorService: EntrenadorService,
    private usuarioService: UsuarioService,
    private gimnasioService: GimnasioService,
    private route: ActivatedRoute
  ) {}

  // Variable clave para saber qué entrenadores mostrar
    gimnasioSeleccionadoId: number | null = null;
  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {

      const id = params.get('id');
      //console.log('ID recibido :', id);

      if (id) {
        this.gimnasioSeleccionadoId = Number(id);
        this.cargarEntrenadores(this.gimnasioSeleccionadoId);
        this.cargarGimnasio(this.gimnasioSeleccionadoId);
        this.cargarUsuarios();
      }

    });
  }

  cargarEntrenadores(id:number): void {
    this.cargando = true;
    this.error = '';
    this.entrenadorService.obtenerPorGimnasio(id).subscribe({
      next: (data) => {
        this.entrenadores = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar entrenadores:', err);
        this.error = 'No se pudieron cargar los entrenadores.';
        this.cargando = false;
      }
    });
  }

  cargarUsuarios(): void {
    this.usuarioService.obtenerTodosResponse().subscribe({
      next: (data: any[]) => this.usuarios = data,
      error: (err) => console.error('Error al cargar usuarios:', err)
    });
  }

  cargarGimnasio(id:number): void {
    this.gimnasioService.obtenerPorId(id).subscribe({
      next: (data) => this.gimnasio = data,
      error: (err) => console.error('Error al cargar gimnasios:', err)
    });
  }

  abrirCrear(): void {
    this.modoEdicion = false;
    this.form = { usuario_id: null, gimnasio_id: null, especialidad: '', matricula: '' };
    this.mostrarFormulario = true;
  }

  abrirEditar(entrenador: EntrenadorResponse): void {
    this.modoEdicion = true;
    this.entrenadorSeleccionado = entrenador;
    this.form = {
      usuario_id: entrenador.usuario_id,
      gimnasio_id: entrenador.gimnasio_id,
      especialidad: entrenador.especialidad,
      matricula: entrenador.matricula
    };
    this.mostrarFormulario = true;
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.entrenadorSeleccionado = null;
  }

  guardar(): void {
    if (!this.gimnasioSeleccionadoId) return;

    if (this.modoEdicion && this.entrenadorSeleccionado) {
      this.entrenadorService.actualizar(this.entrenadorSeleccionado.id!, this.form).subscribe({
        next: () => {
          this.cargarEntrenadores(this.gimnasioSeleccionadoId!);
          this.cerrarFormulario();
        },
        error: (err) => console.error('Error al actualizar entrenador:', err)
      });
      return;
    }

    this.entrenadorService.crear(this.form).subscribe({
      next: () => {
        this.cargarEntrenadores(this.gimnasioSeleccionadoId!);
        this.cerrarFormulario();
      },
      error: (err) => console.error('Error al crear entrenador:', err)
    });
  }

  eliminar(id: number): void {
    if (!this.gimnasioSeleccionadoId) return;

    if (!confirm('¿Estás seguro de que querés eliminar este entrenador?')) return;

    this.entrenadorService.eliminar(id).subscribe({
      next: () => this.cargarEntrenadores(this.gimnasioSeleccionadoId!),
      error: (err) => console.error('Error al eliminar:', err)
    });
  }
}