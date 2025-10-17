export class ReservaVisita {
    private codigo: string;
    private fecha: Date;
    private visitantes: number;
    private tipoRecorrido: 'Guiado' | 'Libre';
  
    constructor(codigo: string, fecha: Date, visitantes: number, tipoRecorrido: 'Guiado' | 'Libre') {
      this.codigo = codigo;
      this.fecha = fecha;
      this.visitantes = visitantes;
      this.tipoRecorrido = tipoRecorrido;
    }
  
    getCodigo(): string { return this.codigo; }
    setCodigo(value: string) { this.codigo = value; }
  
    getFecha(): Date { return this.fecha; }
    setFecha(value: Date) { this.fecha = value; }
  
    getVisitantes(): number { return this.visitantes; }
    setVisitantes(value: number) { this.visitantes = value; }
  
    getTipoRecorrido(): 'Guiado' | 'Libre' { return this.tipoRecorrido; }
    setTipoRecorrido(value: 'Guiado' | 'Libre') { this.tipoRecorrido = value; }
  
    calcularPrecio(): number {
      const precioBase = this.tipoRecorrido === 'Guiado' ? 5000 : 3000;
      let total = this.visitantes * precioBase;
      if (this.fecha.getDay() === 0) total *= 1.2; // Domingos 20% más caro
      if (this.visitantes > 10) total *= 0.85; // 15% de descuento por grupo grande
      return total;
    }
  
    esAltaDemanda(): boolean {
      return this.fecha.getDay() === 6 || this.fecha.getDay() === 0; // sábado o domingo
    }
  }
