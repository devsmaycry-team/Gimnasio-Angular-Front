import { Rutina } from "./Rutina";
import { RutinaEjercicio } from "./RutinaEjercicio";

export interface DiasRutina{
    id?:number,
    rutina:Rutina,
    rutinaEjercicios: RutinaEjercicio[],
    diaSemana:string,
    orden:number
}