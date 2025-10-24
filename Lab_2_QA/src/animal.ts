export class Animal {
    private id: string;
    private nombre: string;
    private especie: string;
    private fechaIngreso: Date;
    private peso: number;
    private estadoSalud: 'Estable' | 'Crítico';
  
    constructor(id: string, nombre: string, especie: string, fechaIngreso: Date, peso: number, estadoSalud: 'Estable' | 'Crítico') {
      this.id = id;
      this.nombre = nombre;
      this.especie = especie;
      this.fechaIngreso = fechaIngreso;
      this.peso = peso;
      this.estadoSalud = estadoSalud;
    }
  
    // Getters y setters
    getId(): string { return this.id; }
    setId(value: string) { this.id = value; }
  
    getNombre(): string { return this.nombre; }
    setNombre(value: string) { this.nombre = value; }
  
    getEspecie(): string { return this.especie; }
    setEspecie(value: string) { this.especie = value; }
  
    getFechaIngreso(): Date { return this.fechaIngreso; }
    setFechaIngreso(value: Date) { this.fechaIngreso = value; }
  
    getPeso(): number { return this.peso; }
    setPeso(value: number) { this.peso = value; }
  
    getEstadoSalud(): 'Estable' | 'Crítico' { return this.estadoSalud; }
    setEstadoSalud(value: 'Estable' | 'Crítico') { this.estadoSalud = value; }
  
    esJoven(): boolean {
      const hoy = new Date();
      const edadEnAnios = hoy.getFullYear() - this.fechaIngreso.getFullYear();
      return edadEnAnios < 2;
    }
  
    necesitaAtencion(): boolean {
      return this.estadoSalud === 'Crítico' || this.peso < 5;
    }
  }