import { Component,OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { SocioService } from '../../../services/Socio/Socio.service'
import { UsuarioService } from '../../../services/Usuario/Usuario.service'

import { Socio } from '../../../model/Socio'
import { Usuario } from '../../../model/Usuario'
import { Gimnasio } from '../../../model/Gimnasio'
import { SocioResponse } from '../../../model/ResponseDTO/SocioResponse'

@Component({
  selector:'app-socios',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl:'./socios.component.html',
  styleUrl:'./socios.component.css'
})
export class SociosComponent implements OnInit{

  socios:Socio[]=[]
  sociosResponse:SocioResponse[]=[]
  usuarios:Usuario[]=[]

  cargando=false
  error:string|null=null
  gimnasioId!:number
  mostrarFormulario=false
  modoEdicion=false
  socioEditandoId?:number
  form!:Socio

  constructor(
    private socioService:SocioService,
    private usuarioService:UsuarioService,
    private route:ActivatedRoute
  ){}

  ngOnInit():void{
    this.route.parent?.paramMap.subscribe(params=>{
      const id=params.get('id')
      if(!id)return
      this.gimnasioId=Number(id)
      this.form=this.crearFormVacio()
      this.cargarSocios()
      this.cargarUsuarios();
    })

  }

  crearFormVacio():Socio{
    return{
      usuario:null as unknown as Usuario,
      gimnasio:{id:this.gimnasioId} as Gimnasio,
      numero_socio:0,
      observacionMedica:''
    }
  }
  cargarSocios():void{
    this.error=null
    this.cargando=true
    this.socioService
      .obtenerPorGimnasio(this.gimnasioId)
      .subscribe({
        next:(data)=>{
          this.sociosResponse=data
          this.cargando=false
          console.log(this.sociosResponse);
        },
        error:()=>{
          this.error='Error al cargar socios'
          this.cargando=false
        }
      })
  }

  abrirCrear():void{
    this.modoEdicion=false
    this.socioEditandoId=undefined
    this.form=this.crearFormVacio()
    this.mostrarFormulario=true
  }

  abrirEditar(socio: SocioResponse): void {
    this.modoEdicion = true;
    this.socioEditandoId = socio.id;

    this.form = {
      id: socio.id,
      numero_socio: socio.numero_socio,
      observacionMedica: socio.observacionMedica,
      gimnasio: { id: this.gimnasioId } as Gimnasio,

      // mapeanding
      usuario: {
        id: socio.usuario_id
      } as Usuario
    };

    this.mostrarFormulario = true;
  }

  cerrarFormulario():void{
    this.mostrarFormulario=false
    this.form=this.crearFormVacio()
  }

  cargarUsuarios(): void {
    this.usuarioService.obtenerTodos().subscribe({
      next: (data) => {
        this.usuarios = data;
        console.log(this.usuarios);
      },
      error: () => {
        this.error = 'Error al cargar usuarios';
      }
    });
  }

  guardar():void{
    this.error=null
    this.form.gimnasio={
      id:this.gimnasioId
    } as Gimnasio
    if(this.modoEdicion&&this.socioEditandoId){
      this.socioService
        .actualizar(this.socioEditandoId,this.form)
        .subscribe({
          next:()=>{
            this.cerrarFormulario()
            this.cargarSocios()
          },
          error:()=>{
            this.error='Error al actualizar socio'
          }
        })

    }
    else{
      this.socioService
        .crear(this.form)
        .subscribe({
          next:()=>{
            this.cerrarFormulario()
            this.cargarSocios()
          },
          error:()=>{
            this.error='Error al crear socio'
          }
        })
    }
  }

  eliminar(id:number):void{
    if(!confirm('¿Eliminar socio?'))return
    this.error=null
    this.socioService
      .eliminar(id)
      .subscribe(()=>this.cargarSocios())
  }

  getNombreUsuario(socio:Socio):string{
    if(!socio.usuario?.persona)
      return'Sin usuario'
    return`${socio.usuario.persona.nombre} ${socio.usuario.persona.apellido}`
  }

}