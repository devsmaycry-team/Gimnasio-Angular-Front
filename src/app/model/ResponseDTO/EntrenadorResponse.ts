import { RutinaResponse } from './RutinaResponse';

export interface EntrenadorResponse {
    id?: number;
    usuario_id: number;
    gimnasio_id: number;
    nombreUsuario: string;
    especialidad: string;
    matricula: string;
    rutinas?: RutinaResponse[];
}