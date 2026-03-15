import { Gimnasio } from "./Gimnasio";
import { Rutina } from "./Rutina";
import { Usuario } from "./Usuario";

export interface Entrenador {
    id?: number;
    usuario: Usuario;
    gimnasio: Gimnasio;
    especialidad: string;
    matricula: string;
    rutinas?: Rutina[];
}