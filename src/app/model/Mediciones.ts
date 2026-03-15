import { Socio } from "./Socio";

export interface Mediciones {
    id?: number;
    socio: Socio;
    fecha: Date | string;
    peso: number;
    grasa_corporal: number;
    pecho: number;
    brazos: number;
}