import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { SocioService } from '../../../services/Socio/Socio.service'
import { UsuarioService } from '../../../services/Usuario/Usuario.service'
import { Socio } from '../../../model/Socio'
import { Usuario } from '../../../model/Usuario'
import { Gimnasio } from '../../../model/Gimnasio'
import { SocioResponse } from '../../../model/ResponseDTO/SocioResponse'
import { UsuarioResponse } from '../../../model/ResponseDTO/UsuarioResponse'
import { SocioRequest } from '../../../model/RequestDTO/SocioRequest'

@Component({
  selector: 'app-socios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './socios.component.html',
  styleUrl: './socios.component.css'
})
export class SociosComponent implements OnInit {
  sociosResponse: SocioResponse[] = []
  usuarios: UsuarioResponse[] = []
  cargando = false
  error: string | null = null
  gimnasioId!: number
  mostrarFormulario = false
  modoEdicion = false
  socioEditandoId?: number

  // Usamos UsuarioResponse en el form para que el select bindee correctamente
  form!: Omit<Socio, 'usuario'> & { usuario: UsuarioResponse | null }

  constructor(
    private socioService: SocioService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      const id = params.get('id')
      if (!id) return
      this.gimnasioId = Number(id)
      this.form = this.crearFormVacio()
      this.cargarSocios()
      this.cargarUsuarios()
    })
  }

  crearFormVacio(): typeof this.form {
    return {
      usuario: null,
      gimnasio: { id: this.gimnasioId } as Gimnasio,
      numero_socio: 0,
      observacionMedica: ''
    }
  }

  cargarSocios(): void {
    this.error = null
    this.cargando = true
    this.socioService.obtenerPorGimnasio(this.gimnasioId).subscribe({
      next: (data) => {
        this.sociosResponse = data
        this.cargando = false
      },
      error: () => {
        this.error = 'Error al cargar socios'
        this.cargando = false
      }
    })
  }

  cargarUsuarios(): void {
    this.usuarioService.obtenerTodosResponse().subscribe({
      next: (data) => {
        this.usuarios = data
      },
      error: () => {
        this.error = 'Error al cargar usuarios'
      }
    })
  }

  abrirCrear(): void {
    this.modoEdicion = false
    this.socioEditandoId = undefined
    this.form = this.crearFormVacio()
    this.mostrarFormulario = true
  }

  abrirEditar(socio: SocioResponse): void {
    this.modoEdicion = true
    this.socioEditandoId = socio.id

    // Buscamos el objeto real del array para que el select lo preseleccione por referencia
    const usuarioEncontrado = this.usuarios.find(u => u.id === socio.usuario_id) ?? null

    this.form = {
      id: socio.id,
      numero_socio: socio.numero_socio,
      observacionMedica: socio.observacionMedica,
      gimnasio: { id: this.gimnasioId } as Gimnasio,
      usuario: usuarioEncontrado
    }
    this.mostrarFormulario = true
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false
    this.form = this.crearFormVacio()
  }

  guardar(): void {
    if (!this.form.numero_socio || this.form.numero_socio <= 0) {
      this.error = 'El número de socio es requerido'
      return
    }
    if (!this.form.usuario) {
      this.error = 'Debe seleccionar un usuario'
      return
    }

    this.error = null

    const payload: SocioRequest = {
      usuario_id: this.form.usuario.id,
      gimnasio_id: this.gimnasioId,
      numero_socio: this.form.numero_socio,
      observacionMedica: this.form.observacionMedica
    }

    if (this.modoEdicion && this.socioEditandoId) {
      this.socioService.actualizar(this.socioEditandoId, payload).subscribe({
        next: () => { this.cerrarFormulario(); this.cargarSocios() },
        error: () => { this.error = 'Error al actualizar socio' }
      })
    } else {
      this.socioService.crear(payload).subscribe({
        next: () => { this.cerrarFormulario(); this.cargarSocios() },
        error: () => { this.error = 'Error al crear socio' }
      })
    }
  }

  eliminar(id: number): void {
    if (!confirm('¿Eliminar socio?')) return
    this.error = null
    this.socioService.eliminar(id).subscribe({
      next: () => this.cargarSocios(),
      error: () => {
        this.error = 'Error al eliminar socio'
      }
    })
  }
}