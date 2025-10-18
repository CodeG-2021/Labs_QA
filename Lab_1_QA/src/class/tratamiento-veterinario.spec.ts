import { Animal } from './animal';
import { TratamientoVeterinario } from './tratamiento-veterinario';

describe('TratamientoVeterinario', () => {
  let animal: Animal;

  beforeEach(() => {
    // Animal base para reutilizar
    animal = new Animal('A1', 'Tigre', 'Felino', new Date(2024, 9, 15), 100, 'Estable');
  });

  afterEach(() => {
    // Limpieza después de cada prueba
    animal = null!;
  });

  // Caso valido
  it('debe calcular correctamente la fecha de finalización del tratamiento', () => {
    /**
     * Nombre de la prueba: Fecha de finalización válida
     * Objetivo: Verificar que la fecha final se calcule sumando los días de duración al inicio.
     * Datos: Fecha = 1/10/2025, duración = 5 días
     * Resultado esperado: Fecha final = 6/10/2025
     */
    const fechaInicio = new Date(2025, 9, 1); // Octubre 1
    const tratamiento = new TratamientoVeterinario('T1', animal, 'Control', fechaInicio, 5, 100);
    const fechaFinal = tratamiento.calcularFechaFinalizacion();

    expect(fechaFinal.getDate()).toBe(6);
    expect(fechaFinal.getMonth()).toBe(9); // Octubre
  });

  // Caso inválido
  it('debe aplicar recargo del 10% si el animal necesita atención', () => {
    const animalCritico = new Animal('A2', 'Mono', 'Primate', new Date(2025, 8, 1), 3, 'Crítico');

    const tratamiento = new TratamientoVeterinario(
      'T2',
      animalCritico,
      'Curación',
      new Date(),
      4,
      50
    );
    const total = tratamiento.calcularCostoTotal();

    expect(total).toBeCloseTo(220, 2);
  });

  // Prueba parametrizada
  const casos = [
    { duracion: 3, costo: 100, estadoSalud: 'Estable', peso: 10, esperado: 300 },
    { duracion: 5, costo: 50, estadoSalud: 'Crítico', peso: 10, esperado: 275 },
    { duracion: 2, costo: 200, estadoSalud: 'Estable', peso: 3, esperado: 440 }, // peso < 5 activa el recargo
  ];

  casos.forEach(({ duracion, costo, estadoSalud, peso, esperado }) => {
    it(`debe calcular correctamente el costo total (duración=${duracion}, costo=${costo}, estado=${estadoSalud}, peso=${peso})`, () => {
      const animalCaso = new Animal(
        'A3',
        'Zorro',
        'Canino',
        new Date(2025, 5, 1),
        peso,
        estadoSalud as any
      );
      const t = new TratamientoVeterinario(
        'T3',
        animalCaso,
        'Tratamiento',
        new Date(),
        duracion,
        costo
      );
      expect(t.calcularCostoTotal()).toBeCloseTo(esperado, 2);
    });
  });
});
