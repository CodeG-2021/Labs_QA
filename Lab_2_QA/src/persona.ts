export interface Persona {
    // Atributos requeridos
    id: number;
    nombre: string;
    correo: string;
    pais: string;
    telefono: string;

    // Métodos requeridos (simulan get y set)
    getId(): number;
    setId(id: number): void;

    getNombre(): string;
    setNombre(nombre: string): void;

    getCorreo(): string;
    setCorreo(correo: string): void;

    getPais(): string;
    setPais(pais: string): void;

    getTelefono(): string;
    setTelefono(telefono: string): void;
}
