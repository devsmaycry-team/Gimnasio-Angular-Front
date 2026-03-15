import { Rol } from "./Rol";
import { Usuario } from "./Usuario";

export interface UserRol {
    id?: number;
    user: Usuario;
    rol: Rol;
}