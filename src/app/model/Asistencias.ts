import { Socio } from "./Socio";

export interface Asistencias{
    id?:number,
    tipo:string,
    fecha_hora:Date,
    socio: Socio
}