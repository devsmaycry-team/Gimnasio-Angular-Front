import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../../model/Usuario';
import { UsuarioService } from '../../../services/Usuario/Usuario.service';

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-usuarios.component.html',
  styleUrl: './gestion-usuarios.component.css'
})
export class GestionUsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  cargando: boolean = false;
  error: string = '';

  // Control del formulario
  mostrarFormulario: boolean = false;
  modoEdicion: boolean = false;
  usuarioSeleccionado: Usuario | null = null;

  // Modelo del formulario
  form: Partial<Usuario> & { password?: string } = {
    correo: '',
    password: '',
    activo: true,
    persona: { nombre: '', apellido: '', celular: '' }
  };

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.cargando = true;
    this.usuarioService.obtenerTodos().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
        this.error = 'No se pudieron cargar los usuarios.';
        this.cargando = false;
      }
    });
  }

  abrirCrear(): void {
    this.modoEdicion = false;
    this.form = {
      correo: '',
      password: '',
      activo: true,
      persona: { nombre: '', apellido: '', celular: '' }
    };
    this.mostrarFormulario = true;
  }

  abrirEditar(usuario: Usuario): void {
    this.modoEdicion = true;
    this.usuarioSeleccionado = usuario;
    this.form = {
      id: usuario.id,
      correo: usuario.correo,
      activo: usuario.activo,
      persona: { ...usuario.persona }
    };
    this.mostrarFormulario = true;
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.usuarioSeleccionado = null;
  }

  guardar(): void {
    const usuario = this.form as Usuario;

    if (this.modoEdicion) {
      // Por ahora no hay endpoint — lo dejamos preparado
      console.warn('Endpoint de edición pendiente en el backend');
      this.cerrarFormulario();
      return;
    }

    this.usuarioService.crear(usuario).subscribe({
      next: () => {
        this.cargarUsuarios();
        this.cerrarFormulario();
      },
      error: (err) => console.error('Error al crear usuario:', err)
    });
  }

  eliminar(id: number): void {
    if (!confirm('¿Estás seguro de que querés eliminar este usuario?')) return;

    this.usuarioService.eliminar(id).subscribe({
      next: () => this.cargarUsuarios(),
      error: (err) => console.error('Error al eliminar:', err)
    });
  }

  getNombreCompleto(usuario: Usuario): string {
    if (!usuario.persona) return 'Sin persona';
    return `${usuario.persona.nombre} ${usuario.persona.apellido}`;
  }

  getRol(usuario: Usuario): string {
    // userRols no viene del backend por @JsonBackReference
    // cuando el backend lo resuelva, sería: usuario.userRols?.[0]?.rol?.cargo
    return 'Sin rol';
  }
}