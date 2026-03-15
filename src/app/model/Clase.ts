import { Entrenador } from "./Entrenador";
import { Gimnasio } from "./Gimnasio";

export interface Clase{
    id?:number,
    entrenador:Entrenador,
    gimnasio:Gimnasio,
    cupo_maximo:number,
}