export interface UsuarioResponse {
    id: number;
    correo: string;
    activo: boolean;
    nombre: string;
    apellido: string;
    roles: string[];
}