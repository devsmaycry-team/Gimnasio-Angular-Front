interface Membresia {
    id?: number;
    socio: Socio;
    plan: Plan;
    pagos?: Pagos[];
    fecha_inicio: Date | string;
    fecha_fin: Date | string;
    estado: boolean;
}