import { Persona } from "./Persona";
import { Socio } from "./Socio";
import { UserRol } from "./UserRol";

export interface Usuario {
    id?: number;
    persona: Persona;
    correo: string;
    password?: string;
    activo: boolean;
    verificationToken?: string;
    verificationTokenExpira?: Date | string;
    resetPasswordToken?: string;
    resetPasswordTokenExpira?: Date | string;
    userRols?: UserRol[];
    socios?: Socio[];
}