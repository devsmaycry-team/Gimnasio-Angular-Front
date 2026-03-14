interface Entrenador {
    id?: number;
    usuario: Usuario;
    gimnasio: Gimnasio;
    especialidad: string;
    matricula: string;
    rutinas?: Rutina[];
}