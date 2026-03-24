import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Gimnasio } from '../../../model/Gimnasio';
import { EntrenadorResponse } from '../../../model/ResponseDTO/EntrenadorResponse';
import { EntrenadorService } from '../../../services/Entrenador/Entrenador.service';
import { GimnasioService } from '../../../services/Gimnasio/Gimnasio.service';
import { UsuarioService } from '../../../services/Usuario/Usuario.service';

interface UsuarioRaw {
  id: number;
  correo: string;
  activo: boolean;
  persona: {
    nombre: string;
    apellido: string;
  };
}

@Component({
  selector: 'app-entrenadores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './entrenadores.component.html',
  styleUrl: './entrenadores.component.css'
})
export class EntrenadoresComponent implements OnInit {

  entrenadores: EntrenadorResponse[] = [];
  usuarios: UsuarioRaw[] = [];
  gimnasios: Gimnasio[] = [];
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
    private gimnasioService: GimnasioService
  ) {}

  ngOnInit(): void {
    this.cargarEntrenadores();
    this.cargarUsuarios();
    this.cargarGimnasios();
  }

  cargarEntrenadores(): void {
    this.cargando = true;
    this.error = '';
    this.entrenadorService.obtenerTodos().subscribe({
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
    this.usuarioService.obtenerTodos().subscribe({
      next: (data: any[]) => this.usuarios = data,
      error: (err) => console.error('Error al cargar usuarios:', err)
    });
  }

  cargarGimnasios(): void {
    this.gimnasioService.obtenerTodos().subscribe({
      next: (data) => this.gimnasios = data,
      error: (err) => console.error('Error al cargar gimnasios:', err)
    });
  }

  getNombreUsuario(usuario_id: number): string {
    const usuario = this.usuarios.find(u => u.id === usuario_id);
    return usuario ? `${usuario.persona.nombre} ${usuario.persona.apellido}` : `#${usuario_id}`;
  }

  getNombreGimnasio(gimnasio_id: number): string {
    const gimnasio = this.gimnasios.find(g => g.id === gimnasio_id);
    return gimnasio ? gimnasio.nombre : `#${gimnasio_id}`;
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
    if (this.modoEdicion && this.entrenadorSeleccionado) {
      this.entrenadorService.actualizar(this.entrenadorSeleccionado.id, this.form).subscribe({
        next: () => { this.cargarEntrenadores(); this.cerrarFormulario(); },
        error: (err) => console.error('Error al actualizar entrenador:', err)
      });
      return;
    }
    this.entrenadorService.crear(this.form).subscribe({
      next: () => { this.cargarEntrenadores(); this.cerrarFormulario(); },
      error: (err) => console.error('Error al crear entrenador:', err)
    });
  }

  eliminar(id: number): void {
    if (!confirm('¿Estás seguro de que querés eliminar este entrenador?')) return;
    this.entrenadorService.eliminar(id).subscribe({
      next: () => this.cargarEntrenadores(),
      error: (err) => console.error('Error al eliminar:', err)
    });
  }
}