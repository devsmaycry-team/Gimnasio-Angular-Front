import { Usuario } from "./Usuario";

export interface Persona {
    id?: number;
    nombre: string;
    apellido: string;
    celular: string;
    usuarios?: Usuario[];
}