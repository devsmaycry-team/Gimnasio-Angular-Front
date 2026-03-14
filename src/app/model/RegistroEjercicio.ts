interface RegistroEjercicio {
    id?: number;
    rutina: Rutina;
    ejercicio: Ejercicio;
    series_hechas: number;
    repeticiones_hechas: number;
    peso_real: number;
    observacion: string;
}