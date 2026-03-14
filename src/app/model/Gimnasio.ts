interface Gimnasio {
    id?: number;
    nombre: string;
    direccion: string;
    telefono: string;
    email: string;
    codigoGym: string;
    socios?: Socio[];
    entrenadores?: Entrenador[];
    planes?: Plan[];
    clases?: Clase[];
}