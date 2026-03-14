interface Plan {
    id?: number;
    gimnasio: Gimnasio;
    nombre: string;
    precio: number;
    duracion_dias: number;
    clases_incluidas: number;
    membresias?: Membresia[];
}