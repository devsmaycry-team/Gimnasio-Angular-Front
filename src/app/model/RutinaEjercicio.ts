import { DiasRutina } from "./DiasRutina";
import { Ejercicio } from "./Ejercicio";

export interface RutinaEjercicio {
    id?: number;
    diasRutina: DiasRutina;
    ejercicio: Ejercicio;
    series: number;
    repeticiones: number;
    peso_objetivo: string;
    descanso_seg: string;
}