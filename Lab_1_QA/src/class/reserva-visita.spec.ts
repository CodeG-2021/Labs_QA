import { ReservaVisita } from './reserva-visita';

describe('ReservaVisita', () => {
  let reserva: ReservaVisita;
  let fechaLunes: Date;
  let fechaDomingo: Date;

  beforeEach(() => {
    // Configuración común para las pruebas
    // 2025-01-06 es lunes, 2025-01-05 es domingo
    fechaLunes = new Date(2025, 0, 6);
    fechaDomingo = new Date(2025, 0, 5);
    reserva = new ReservaVisita('R001', fechaLunes, 5, 'Libre');
  });

  afterEach(() => {
    // Limpieza después de cada prueba
    reserva = null as any;
  });

  // MÉTODO 1 con CC>1: calcularPrecio() - tiene múltiples condicionales (CC=4)
  describe('#calcularPrecio - Método con complejidad ciclomática >1', () => {
    it('caso válido: debería calcular precio con recargo y descuento aplicados', () => {
      // Nombre: calcularPrecio - caso válido con modificadores
      // Objetivo: Verificar cálculo correcto con recargo de domingo y descuento de grupo
      // Datos de prueba: tipo='Guiado', visitantes=15 (>10), fecha=domingo
      // Resultado esperado: 15 * 5000 * 1.2 * 0.85 = 76500
      reserva.setTipoRecorrido('Guiado');
      reserva.setVisitantes(15);
      reserva.setFecha(fechaDomingo);
      const precio = reserva.calcularPrecio();
      expect(precio).toBe(76500);
    });

    it('caso inválido: debería calcular precio base sin modificadores', () => {
      // Nombre: calcularPrecio - caso sin modificadores
      // Objetivo: Verificar cálculo base sin recargos ni descuentos
      // Datos de prueba: tipo='Libre', visitantes=5 (<=10), fecha=lunes
      // Resultado esperado: 5 * 3000 = 15000
      reserva.setTipoRecorrido('Libre');
      reserva.setVisitantes(5);
      reserva.setFecha(fechaLunes);
      const precio = reserva.calcularPrecio();
      expect(precio).toBe(15000);
    });
  });

  // MÉTODO 2 con CC>1: esAltaDemanda() - tiene OR lógico (CC=2)
  describe('#esAltaDemanda - Método con complejidad ciclomática >1', () => {
    it('caso válido: debería retornar TRUE en día de alta demanda (fin de semana)', () => {
      // Nombre: esAltaDemanda - caso válido fin de semana
      // Objetivo: Verificar que retorna true para sábados y domingos
      // Datos de prueba: fecha = domingo (getDay() = 0)
      // Resultado esperado: true
      reserva.setFecha(fechaDomingo);
      const resultado = reserva.esAltaDemanda();
      expect(resultado).toBeTrue();
    });

    it('caso inválido: debería retornar FALSE en día de baja demanda (día hábil)', () => {
      // Nombre: esAltaDemanda - caso inválido día hábil
      // Objetivo: Verificar que retorna false para días entre semana
      // Datos de prueba: fecha = lunes (getDay() = 1)
      // Resultado esperado: false
      reserva.setFecha(fechaLunes);
      const resultado = reserva.esAltaDemanda();
      expect(resultado).toBeFalse();
    });
  });

  // MÉTODO ADICIONAL: Prueba parametrizada - calcularPrecio con diferentes configuraciones
  describe('#calcularPrecio - Caso de prueba parametrizado', () => {
    const casosParametrizados = [
      {
        tipo: 'Libre' as const,
        visitantes: 8,
        fecha: new Date(2025, 0, 6), // lunes
        esperado: 24000, // 8 * 3000
        descripcion: 'recorrido libre en día normal'
      },
      {
        tipo: 'Guiado' as const,
        visitantes: 12,
        fecha: new Date(2025, 0, 6), // lunes
        esperado: 51000, // 12 * 5000 * 0.85 (descuento grupo)
        descripcion: 'recorrido guiado con grupo grande'
      },
      {
        tipo: 'Guiado' as const,
        visitantes: 6,
        fecha: new Date(2025, 0, 5), // domingo
        esperado: 36000, // 6 * 5000 * 1.2 (recargo domingo)
        descripcion: 'recorrido guiado en domingo'
      }
    ];

    casosParametrizados.forEach((caso, index) => {
      it(`entrada ${index + 1}: ${caso.descripcion} debería retornar ${caso.esperado}`, () => {
        // Nombre: calcularPrecio - parametrizado caso ${index + 1}
        // Objetivo: Validar diferentes combinaciones de tipo, visitantes y fecha
        // Datos de prueba: tipo=${caso.tipo}, visitantes=${caso.visitantes}, fecha=${caso.fecha.toDateString()}
        // Resultado esperado: ${caso.esperado}
        reserva.setTipoRecorrido(caso.tipo);
        reserva.setVisitantes(caso.visitantes);
        reserva.setFecha(caso.fecha);
        const precio = reserva.calcularPrecio();
        expect(precio).toBe(caso.esperado);
      });
    });
  });
});
