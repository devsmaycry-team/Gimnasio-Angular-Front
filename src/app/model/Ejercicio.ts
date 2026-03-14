export interface Ejercicio {
    id?: number;
    nombre: string;
    grupo_muscular: string;
    equipo: string;
    imagen_url: string;
    video_url: string;
    
    rutinaEjercicios?: RutinaEjercicio[];
    registroEjercicios?: RegistroEjercicio[];
}