export interface SocioResponse {
    id: number;
    usuario_id: number;
    nombre: string;
    apellido: string;
    numero_socio: number;
    gimnasio_id: number;
    gimnasioAsociado: string;
    observacionMedica: string;

    mediciones?: any[];
    membresias?: any[];
    pagos?: any[];
    asistencias?: any[];
    inscripcionClases?: any[];
}