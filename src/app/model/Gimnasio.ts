import { Clase } from "./Clase";
import { Entrenador } from "./Entrenador";
import { Plan } from "./Plan";
import { Socio } from "./Socio";

export interface Gimnasio {
    id?: number;
    nombre: string;
    direccion: string;
    telefono: string;
    email: string;
    codigoGym: string;
    socios?: Socio[];
    entrenadores?: Entrenador[];
    planes?: Plan[];
    clases?: Clase[];
}