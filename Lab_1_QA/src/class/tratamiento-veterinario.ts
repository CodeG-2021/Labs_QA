import { Animal } from './animal';

export class TratamientoVeterinario {
  private codigo: string;
  private animal: Animal;
  private descripcion: string;
  private fecha: Date;
  private duracionDias: number;
  private costoPorDia: number;

  constructor(codigo: string, animal: Animal, descripcion: string, fecha: Date, duracionDias: number, costoPorDia: number) {
    this.codigo = codigo;
    this.animal = animal;
    this.descripcion = descripcion;
    this.fecha = fecha;
    this.duracionDias = duracionDias;
    this.costoPorDia = costoPorDia;
  }

  getCodigo(): string { return this.codigo; }
  setCodigo(value: string) { this.codigo = value; }

  getAnimal(): Animal { return this.animal; }
  setAnimal(value: Animal) { this.animal = value; }

  getDescripcion(): string { return this.descripcion; }
  setDescripcion(value: string) { this.descripcion = value; }

  getFecha(): Date { return this.fecha; }
  setFecha(value: Date) { this.fecha = value; }

  getDuracionDias(): number { return this.duracionDias; }
  setDuracionDias(value: number) { this.duracionDias = value; }

  getCostoPorDia(): number { return this.costoPorDia; }
  setCostoPorDia(value: number) { this.costoPorDia = value; }

  calcularFechaFinalizacion(): Date {
    const final = new Date(this.fecha);
    final.setDate(final.getDate() + this.duracionDias);
    return final;
  }

  calcularCostoTotal(): number {
    let total = this.duracionDias * this.costoPorDia;
    if (this.animal.necesitaAtencion()) {
      total *= 1.1; // Recargo por estado crítico o peso bajo
    }
    return total;
  }
}
