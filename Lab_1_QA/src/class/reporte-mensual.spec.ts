import { ReporteMensual } from './reporte-mensual';
import { Animal } from './animal';
import { ReservaVisita } from './reserva-visita';
import { TratamientoVeterinario } from './tratamiento-veterinario';

describe('ReporteMensual', () => {
  let reporte: ReporteMensual;
  let animales: Animal[];
  let reservas: ReservaVisita[];
  let tratamientos: TratamientoVeterinario[];

  beforeEach(() => {

    // Mock de clases dependientes
    animales = [
      new Animal('A1', 'Tigre', 'Felino', new Date(2025, 9, 10), 200, 'Estable'), // Octubre = 9 (indexado desde 0)
    ];

    reservas = [new ReservaVisita('R1', new Date(2025, 9, 15), 4, 'Libre')];

    const animalTratado = new Animal('A2', 'Mono', 'Primate', new Date(2025, 8, 1), 25, 'Estable');
    tratamientos = [
      new TratamientoVeterinario('T1', animalTratado, 'Revisión', new Date(2025, 9, 12), 3, 100),
    ];

    reporte = new ReporteMensual(10, 2025, animales, reservas, tratamientos);
  });

  afterEach(() => {
    reporte = null!;
  });

  //Prueba válida
  it('debe generar un resumen correcto cuando hay datos válidos', () => {
    const resumen = reporte.generarResumen();
    expect(resumen).toContain('Animales ingresados: 1');
    expect(resumen).toContain('Total de visitantes: 4');
    expect(resumen).toContain('Animales tratados: 1');
  });

  //Prueba inválida
  it('debe generar un resumen vacío cuando no hay datos del mes', () => {
    reporte.setMes(11);
    const resumen = reporte.generarResumen();
    expect(resumen).toContain('Animales ingresados: 0');
    expect(resumen).toContain('Total de visitantes: 0');
    expect(resumen).toContain('Animales tratados: 0');
  });
});
