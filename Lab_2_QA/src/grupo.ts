import { Persona } from "./persona";

export interface Grupo {
    obtenerMiembros(): Array<Persona>;
    buscarMiembroPorNombre(nombre: string): Persona | null;    
    esGrupoActivo(): boolean;
    desactivarGrupo(): void;
    getIntegrantes(): Array<Persona>;
    agregarIntegrante(p: Persona): void;
    removerIntegrante(p: Persona): void;
    removerIntegrantePorID(id: number): boolean;
    getCantidadIntegrantes(): number;
    estaCompleto(): boolean;
}
