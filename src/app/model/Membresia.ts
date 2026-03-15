import { Pagos } from "./Pagos";
import { Plan } from "./Plan";
import { Socio } from "./Socio";

export interface Membresia {
    id?: number;
    socio: Socio;
    plan: Plan;
    pagos?: Pagos[];
    fecha_inicio: Date | string;
    fecha_fin: Date | string;
    estado: boolean;
}