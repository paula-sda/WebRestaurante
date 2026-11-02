export interface HomeReservationForm{
    date: string;
    hour: string;
    persons: string;
}

export interface ReservationForm{
    date: string;
    hour: string;
    persons: string;
    name: string;
    email: string;
    phone: string;
}

export interface ReservationEmail{
    fecha: string;
    hora: string;
    personas: number;
    nombre: string;
    email: string;
    telefono: string;
}