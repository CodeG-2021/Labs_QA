import { Animal } from './animal';
import { ReservaVisita } from './reserva-visita';
import { TratamientoVeterinario } from './tratamiento-veterinario';

export class ReporteMensual {
  private animales: Animal[];
  private reservas: ReservaVisita[];
  private tratamientos: TratamientoVeterinario[];
  private mes: number;
  private anio: number;

  constructor(mes: number, anio: number, animales: Animal[], reservas: ReservaVisita[], tratamientos: TratamientoVeterinario[]) {
    this.mes = mes;
    this.anio = anio;
    this.animales = animales;
    this.reservas = reservas;
    this.tratamientos = tratamientos;
  }

  public getAnimales(): Animal[] {
    return this.animales;
  }

  public getReservas(): ReservaVisita[] {
    return this.reservas;
  }

  public getTratamientos(): TratamientoVeterinario[] {
    return this.tratamientos;
  }

  public getMes(): number {
    return this.mes;
  }

  public getAnio(): number {
    return this.anio;
  }

  public setMes(mes: number): void {
    this.mes = mes;
  }

  public setAnio(anio: number): void {
    this.anio = anio;
  }

  public setAnimales(animales: Animal[]): void {
    this.animales = animales;
  }

  public setReservas(reservas: ReservaVisita[]): void {
    this.reservas = reservas;
  }

  public setTratamientos(tratamientos: TratamientoVeterinario[]): void {
    this.tratamientos = tratamientos;
  }

  // Método con complejidad: cuenta los animales nuevos del mes
  public contarAnimalesNuevos(): number {
    return this.animales.filter(a =>
      new Date(a.getFechaIngreso()).getMonth() + 1 === this.mes &&
      new Date(a.getFechaIngreso()).getFullYear() === this.anio
    ).length;
  }

  // Método con complejidad: total de visitantes en el mes
  public calcularTotalVisitantes(): number {
    return this.reservas
      .filter(r =>
        new Date(r.getFecha()).getMonth() + 1 === this.mes &&
        new Date(r.getFecha()).getFullYear() === this.anio
      )
      .reduce((acc, curr) => acc + curr.getVisitantes(), 0);
  }

  // Método con complejidad: animales con tratamientos en el mes
  public listarAnimalesTratados(): string[] {
    const animalesTratados = this.tratamientos
      .filter(t =>
        new Date(t.getFecha()).getMonth() + 1 === this.mes &&
        new Date(t.getFecha()).getFullYear() === this.anio
      )
      .map(t => t.getAnimal().getNombre());

    // Elimina duplicados
    return [...new Set(animalesTratados)];
  }

  // Método complejo que combina lógica condicional + agregación
  public generarResumen(): string {
    const nuevos = this.contarAnimalesNuevos();
    const visitantes = this.calcularTotalVisitantes();
    const tratados = this.listarAnimalesTratados().length;

    return `Resumen ${this.mes}/${this.anio}:
- Animales ingresados: ${nuevos}
- Total de visitantes: ${visitantes}
- Animales tratados: ${tratados}`;
  }
}

