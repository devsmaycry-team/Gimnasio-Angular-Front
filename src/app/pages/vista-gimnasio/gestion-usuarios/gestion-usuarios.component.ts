import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../services/Usuario/Usuario.service';
import { Usuario } from '../../../model/Usuario';
import { UsuarioResponse } from '../../../model/ResponseDTO/UsuarioResponse';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-usuarios.component.html',
  styleUrl: './gestion-usuarios.component.css'
})
export class GestionUsuariosComponent implements OnInit {
  usuarios: UsuarioResponse[] = [];
  usuariosDelGym: UsuarioResponse[] = [];
  cargando: boolean = false;
  error: string = '';
  mostrarFormulario: boolean = false;
  modoEdicion: boolean = false;
  usuarioSeleccionado: UsuarioResponse | null = null;
  form: Partial<Usuario> & { password?: string } = {
    correo: '',
    password: '',
    activo: true,
    persona: {
      nombre: '',
      apellido: '',
      celular: ''
    }
  };

  constructor(private usuarioService: UsuarioService, private route: ActivatedRoute) {}

    // Variable clave para saber qué usuarios mostrar
    gimnasioSeleccionadoId: number | null = null;
  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      const id = params.get('id');
      //console.log('ID recibido :', id);

      if (id) {
        this.gimnasioSeleccionadoId = Number(id);
        this.cargarUsuarios();
        this.cargarUsuariosByGym(this.gimnasioSeleccionadoId);
      }
    });
  }

  cargarUsuarios(): void {
    this.cargando = true;
    this.error = '';
    this.usuarioService.obtenerTodosResponse().subscribe({
      next: (data) => {
        this.usuarios = data;
        console.log("Usuarios cargados:", this.usuarios);
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
        this.error = 'No se pudieron cargar los usuarios.';
        this.cargando = false;
      }
    });
  }

    cargarUsuariosByGym(id:number): void {
      this.cargando = true;
      this.error = '';
      this.usuarioService.obtenerSegunSocioGym(id).subscribe({
        next: (data) => {
          this.usuariosDelGym = data;
          console.log("Usuarios cargados segun gym:", this.usuariosDelGym);
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
      persona: {
        nombre: '',
        apellido: '',
        celular: ''
      }
    };
    this.mostrarFormulario = true;
  }

  abrirEditar(usuario: UsuarioResponse): void {
    this.modoEdicion = true;
    this.usuarioSeleccionado = usuario;
    this.form = {
      id: usuario.id,
      correo: usuario.correo,
      activo: usuario.activo,
      persona: {
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        celular: ''
      }
    };
    this.mostrarFormulario = true;
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.usuarioSeleccionado = null;
  }

  guardar(): void {
    const usuario = this.form as Usuario;
    if (this.modoEdicion && this.usuarioSeleccionado) {
      this.usuarioService.actualizar(
        this.usuarioSeleccionado.id,
        usuario
      ).subscribe({
        next: () => {
          this.cargarUsuarios();
          this.cerrarFormulario();
        },
        error: (err) =>
          console.error('Error al actualizar usuario:', err)
      });
      return;
    }
    this.usuarioService.crear(usuario).subscribe({
      next: () => {
        this.cargarUsuarios();
        this.cerrarFormulario();
      },
      error: (err) =>
        console.error('Error al crear usuario:', err)
    });
  }

  eliminar(id: number): void {
    if (!confirm('¿Estás seguro de que querés eliminar este usuario?'))
      return;
    this.usuarioService.eliminar(id).subscribe({
      next: () =>
        this.cargarUsuarios(),
      error: (err) =>
        console.error('Error al eliminar:', err)
    });
  }

  getNombreCompleto(usuario: UsuarioResponse): string {
    return `${usuario.nombre} ${usuario.apellido}`;
  }

  getRol(usuario: UsuarioResponse): string {
  if (!usuario.roles || usuario.roles.length === 0)
    return 'Sin rol';

  const rolesTraducidos = usuario.roles.map(role => {
      switch (role) {
        case 'ROLE_ENTRENADOR':
          return 'Entrenador';
        case 'ROLE_ADMIN':
          return 'Admin';
        case 'ROLE_SUPERADMIN':
          return 'SuperAdmin';
        default:
          return role; // por si aparece un rol nuevo
      }
    });
    return rolesTraducidos.join(', ');
  }
}
