import { Animal } from './animal';

describe('Animal', () => {
  let animal: Animal;

  beforeEach(() => {
    // Configuración común para las pruebas
    animal = new Animal('A001', 'Test', 'Especie', new Date(2024, 0, 1), 8, 'Estable');
  });

  afterEach(() => {
    // Limpieza después de cada prueba
    animal = null as any;
  });

  // MÉTODO 1 con CC>1: necesitaAtencion() - tiene OR lógico (CC=2)
  describe('#necesitaAtencion - Método con complejidad ciclomática >1', () => {
    it('caso válido: debería retornar TRUE cuando el animal necesita atención por estado crítico', () => {
      // Nombre: necesitaAtencion - caso válido crítico
      // Objetivo: Verificar que retorna true cuando el estado es crítico
      // Datos de prueba: estado = 'Crítico', peso = 10 (>5)
      // Resultado esperado: true
      animal.setEstadoSalud('Crítico');
      animal.setPeso(10);
      const resultado = animal.necesitaAtencion();
      expect(resultado).toBeTrue();
    });

    it('caso inválido: debería retornar FALSE cuando el animal NO necesita atención', () => {
      // Nombre: necesitaAtencion - caso inválido estable
      // Objetivo: Verificar que retorna false cuando no hay criterios de atención
      // Datos de prueba: estado = 'Estable', peso = 8 (>=5)
      // Resultado esperado: false
      animal.setEstadoSalud('Estable');
      animal.setPeso(8);
      const resultado = animal.necesitaAtencion();
      expect(resultado).toBeFalse();
    });
  });

  // MÉTODO 2 con CC>1: esJoven() - tiene condicional de años (CC=2)
  describe('#esJoven - Método con complejidad ciclomática >1', () => {
    it('caso válido: debería retornar TRUE para animal joven (menos de 2 años)', () => {
      // Nombre: esJoven - caso válido joven
      // Objetivo: Verificar que retorna true para animales con menos de 2 años
      // Datos de prueba: fechaIngreso = año actual - 1 año
      // Resultado esperado: true
      const fechaReciente = new Date();
      fechaReciente.setFullYear(fechaReciente.getFullYear() - 1);
      animal.setFechaIngreso(fechaReciente);
      const resultado = animal.esJoven();
      expect(resultado).toBeTrue();
    });

    it('caso inválido: debería retornar FALSE para animal adulto (2 años o más)', () => {
      // Nombre: esJoven - caso inválido adulto
      // Objetivo: Verificar que retorna false para animales de 2 años o más
      // Datos de prueba: fechaIngreso = año actual - 3 años
      // Resultado esperado: false
      const fechaAntigua = new Date();
      fechaAntigua.setFullYear(fechaAntigua.getFullYear() - 3);
      animal.setFechaIngreso(fechaAntigua);
      const resultado = animal.esJoven();
      expect(resultado).toBeFalse();
    });
  });

  // MÉTODO ADICIONAL: Prueba parametrizada - necesitaAtencion con diferentes combinaciones
  describe('#necesitaAtencion - Caso de prueba parametrizado', () => {
    const casosParametrizados = [
      { 
        estado: 'Crítico' as const, 
        peso: 10, 
        esperado: true, 
        descripcion: 'estado crítico con peso normal' 
      },
      { 
        estado: 'Estable' as const, 
        peso: 3, 
        esperado: true, 
        descripcion: 'estado estable con peso bajo' 
      },
      { 
        estado: 'Estable' as const, 
        peso: 7, 
        esperado: false, 
        descripcion: 'estado estable con peso normal' 
      }
    ];

    casosParametrizados.forEach((caso, index) => {
      it(`entrada ${index + 1}: ${caso.descripcion} debería retornar ${caso.esperado}`, () => {
        // Nombre: necesitaAtencion - parametrizado caso ${index + 1}
        // Objetivo: Validar diferentes combinaciones de estado y peso
        // Datos de prueba: estado = ${caso.estado}, peso = ${caso.peso}
        // Resultado esperado: ${caso.esperado}
        animal.setEstadoSalud(caso.estado);
        animal.setPeso(caso.peso);
        const resultado = animal.necesitaAtencion();
        expect(resultado).toBe(caso.esperado);
      });
    });
  });
});
