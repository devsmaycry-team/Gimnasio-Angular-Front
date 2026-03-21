export interface PlanRequest {
    id?: number;
    gimnasio_id: number; 
    nombre: string;
    precio: number;
    duracion_dias: number;
    clases_incluidas: number;
}