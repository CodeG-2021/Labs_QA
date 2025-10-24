import { Grupo } from "./grupo";
import { Persona } from "./persona";

export class ReservaVisita {
  private codigo: string;
  private fecha: Date;
  private visitantes: number;
  private tipoRecorrido: 'Guiado' | 'Libre';
  private grupo: Grupo | null;


  constructor(codigo: string, fecha: Date, tipoRecorrido: 'Guiado' | 'Libre', grupo: Grupo) {
    this.codigo = codigo;
    this.fecha = fecha;
    this.visitantes = grupo.getCantidadIntegrantes();
    this.tipoRecorrido = tipoRecorrido;
    this.grupo = grupo;
  }

  getCodigo(): string { return this.codigo; }
  setCodigo(value: string) { this.codigo = value; }

  getFecha(): Date { return this.fecha; }
  setFecha(value: Date) { this.fecha = value; }

  getVisitantes(): number { return this.visitantes; }
  setVisitantes(value: number) { this.visitantes = value; }

  getTipoRecorrido(): 'Guiado' | 'Libre' { return this.tipoRecorrido; }
  setTipoRecorrido(value: 'Guiado' | 'Libre') { this.tipoRecorrido = value; }

  public calcularPrecioTotal(): number {
    const base = 10;
    const recargo = this.tipoRecorrido === "Guiado" ? 5 : 0;
    const descuento = this.fecha.getDay() === 2 ? 0.1 : 0; // martes descuento
    return (this.visitantes * (base + recargo)) * (1 - descuento);
  }

  public esAltaDemanda(): boolean {
    const dia = this.fecha.getDay();
    return dia === 0 || dia === 6; // domingo o sábado
  }

  // 🔹 Verifica si todos los miembros del grupo son del mismo país
  public esGrupoHomogéneo(): boolean {
    let integrantes = new Array<Persona>();
    if (this.grupo !== null)
      integrantes = this.grupo.getIntegrantes();
    if (integrantes.length === 0) return false;
    const paisBase = integrantes[0].getPais();
    for (let i = 1; i < integrantes.length; i++) {
      if (integrantes[i].getPais() !== paisBase) {
        return false;
      }
    }
    return true;
  }

  // 🔹 Retorna los correos de los visitantes si hay más de 3 personas y la visita es guiada
  public obtenerCorreosGrupoFiltrado(): Array<string> {
    let integrantes = new Array<Persona>();
    if (this.grupo !== null)
      integrantes = this.grupo.getIntegrantes();
    const resultado: Array<string> = [];
    if (integrantes.length > 3 && this.tipoRecorrido === "Guiado") {
      for (const persona of integrantes) {
        if (persona.getCorreo().includes("@")) {
          resultado.push(persona.getCorreo());
        }
      }
    }
    return resultado;
  }
}
