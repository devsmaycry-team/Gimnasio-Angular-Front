interface Rutina {
    id?: number;
    entrenador: Entrenador;
    nombre: string;
    objetivo: string;
    nivel: string;
    duracion_semanas: string;
    estado: boolean;
    editable: boolean;
    diasRutinas?: DiasRutina[];
    registroEjercicios?: RegistroEjercicio[];
}