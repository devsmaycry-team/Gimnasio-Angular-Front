interface Pagos {
    id?: number;
    socio: Socio;
    membresia: Membresia;
    monto: number;
    metodo_pago: string;
    fecha: Date | string;
    referencia: string;
}