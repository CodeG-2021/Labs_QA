import { ReservaVisita } from '../reserva-visita';
import { Grupo } from '../grupo';
import { Persona } from '../persona';
import { instance, mock, reset, when } from 'ts-mockito';

// Se seleccionó el doble de prueba tipo "mock" porque permite definir el
// comportamiento esperado del Grupo y de las Personas, habilitando escenarios
// controlados que simulan la colaboración real entre clases sin depender de
// implementaciones concretas.

describe('Integración ReservaVisita ↔ Grupo', () => {
  let grupoMock: Grupo;
  let grupoInstancia: Grupo;
  let personas: Array<Persona>;

  beforeEach(() => {
    grupoMock = mock<Grupo>();
    personas = [];
  });

  afterEach(() => {
    reset(grupoMock as unknown as object);
    personas = [];
  });

  function crearPersona(
    id: number,
    nombre: string,
    correo: string,
    pais: string,
    telefono = '+50600000000'
  ): Persona {
    const personaMock = mock<Persona>();
    when(personaMock.getId()).thenReturn(id);
    when(personaMock.getNombre()).thenReturn(nombre);
    when(personaMock.getCorreo()).thenReturn(correo);
    when(personaMock.getPais()).thenReturn(pais);
    when(personaMock.getTelefono()).thenReturn(telefono);
    return instance(personaMock);
  }

  function configurarGrupo(miembros: Array<Persona>) {
    personas = miembros;
    when(grupoMock.getIntegrantes()).thenReturn(personas);
    when(grupoMock.getCantidadIntegrantes()).thenReturn(personas.length);
    grupoInstancia = instance(grupoMock);
  }

  it('debe validar cuando el grupo es homogéneo por país', () => {
    /*
     * Nombre de la prueba: Grupo homogéneo
     * Objetivo: Verificar que la reserva identifique correctamente un grupo donde
     *           todos los integrantes comparten el mismo país.
     * Datos de prueba: Cuatro personas costarricenses en visita guiada el 5/5/2025.
     * Resultado esperado: esGrupoHomogéneo() retorna true.
     */
    configurarGrupo([
      crearPersona(1, 'Ana', 'ana@correo.com', 'Costa Rica'),
      crearPersona(2, 'Luis', 'luis@correo.com', 'Costa Rica'),
      crearPersona(3, 'María', 'maria@correo.com', 'Costa Rica'),
      crearPersona(4, 'Jose', 'jose@correo.com', 'Costa Rica')
    ]);

    const reserva = new ReservaVisita('R-100', new Date('2025-05-05'), 'Guiado', grupoInstancia);

    expect(reserva.esGrupoHomogéneo()).toBeTrue();
  });

  it('debe detectar un grupo heterogéneo por país', () => {
    /*
     * Nombre de la prueba: Grupo heterogéneo
     * Objetivo: Confirmar que la reserva identifica cuando existen integrantes de
     *           distintos países.
     * Datos de prueba: Integrantes de Costa Rica y Nicaragua en visita guiada el 3/4/2025.
     * Resultado esperado: esGrupoHomogéneo() retorna false.
     */
    configurarGrupo([
      crearPersona(5, 'Elena', 'elena@correo.com', 'Costa Rica'),
      crearPersona(6, 'Marco', 'marco@correo.com', 'Nicaragua'),
      crearPersona(7, 'Sofía', 'sofia@correo.com', 'Costa Rica')
    ]);

    const reserva = new ReservaVisita('R-101', new Date('2025-04-03'), 'Guiado', grupoInstancia);

    expect(reserva.esGrupoHomogéneo()).toBeFalse();
  });

  it('debe obtener los correos cuando el grupo cumple las condiciones', () => {
    /*
     * Nombre de la prueba: Correos filtrados válidos
     * Objetivo: Validar que solo las visitas guiadas con más de tres integrantes
     *           devuelven los correos válidos de los participantes.
     * Datos de prueba: Cinco integrantes con correos válidos en visita guiada el 7/6/2025.
     * Resultado esperado: obtenerCorreosGrupoFiltrado() devuelve los cinco correos.
     */
    configurarGrupo([
      crearPersona(8, 'Pedro', 'pedro@correo.com', 'Panamá'),
      crearPersona(9, 'Lucía', 'lucia@correo.com', 'Panamá'),
      crearPersona(10, 'Diego', 'diego@correo.com', 'Panamá'),
      crearPersona(11, 'Carla', 'carla@correo.com', 'Panamá'),
      crearPersona(12, 'Andrés', 'andres@correo.com', 'Panamá')
    ]);

    const reserva = new ReservaVisita('R-102', new Date('2025-06-07'), 'Guiado', grupoInstancia);

    expect(reserva.obtenerCorreosGrupoFiltrado()).toEqual([
      'pedro@correo.com',
      'lucia@correo.com',
      'diego@correo.com',
      'carla@correo.com',
      'andres@correo.com'
    ]);
  });

  it('debe retornar lista vacía cuando la visita no cumple los criterios', () => {
    /*
     * Nombre de la prueba: Correos descartados
     * Objetivo: Corroborar que las visitas libres o con correos inválidos no
     *           generan resultados en el filtrado.
     * Datos de prueba: Tres integrantes con correos inválidos en visita libre el 1/7/2025.
     * Resultado esperado: obtenerCorreosGrupoFiltrado() devuelve un arreglo vacío.
     */
    configurarGrupo([
      crearPersona(13, 'Marta', 'martacorreocom', 'México'),
      crearPersona(14, 'Raúl', 'raul#correo.com', 'México'),
      crearPersona(15, 'Pablo', 'pablo_correo.com', 'México')
    ]);

    const reserva = new ReservaVisita('R-103', new Date('2025-07-01'), 'Libre', grupoInstancia);

    expect(reserva.obtenerCorreosGrupoFiltrado()).toEqual([]);
  });
});
