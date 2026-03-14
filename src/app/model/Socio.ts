interface Socio {
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