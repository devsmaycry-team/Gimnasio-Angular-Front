import { HorariosClases } from "./HorariosClases";
import { Socio } from "./Socio";

export interface InscripcionClases {
    id?: number;
    horariosClases: HorariosClases;
    socio: Socio;
}