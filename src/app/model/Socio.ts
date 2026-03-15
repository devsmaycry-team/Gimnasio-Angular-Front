import { Asistencias } from "./Asistencias";
import { Gimnasio } from "./Gimnasio";
import { InscripcionClases } from "./InscripcionClases";
import { Mediciones } from "./Mediciones";
import { Membresia } from "./Membresia";
import { Pagos } from "./Pagos";
import { Usuario } from "./Usuario";

export interface Socio {
    id?: number;
    usuario: Usuario;
    gimnasio: Gimnasio;
    numero_socio: number;
    observacionMedica: string;
    mediciones?: Mediciones[];
    membresias?: Membresia[];
    pagos?: Pagos[];
    asistencias?: Asistencias[];
    inscripcionClases?: InscripcionClases[];
}