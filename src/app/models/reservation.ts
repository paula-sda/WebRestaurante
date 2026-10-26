export interface HomeReservationForm{
    fecha: string;
    hora: string;
    personas: string;
}

export interface ReservationForm{
    fecha: string;
    hora: string;
    personas: string;
    nombre: string;
    email: string;
    telefono: string;
}

export interface ReservationEmail{
    fecha: string;
    hora: string;
    personas: number;
    nombre: string;
    email: string;
    telefono: string;
}