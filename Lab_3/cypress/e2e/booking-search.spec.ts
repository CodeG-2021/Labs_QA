const formatDate = (offsetDays: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().split('T')[0];
};

describe('Booking.com - Formulario de búsqueda', () => {
  beforeEach(() => {
    cy.visit('/', {
      headers: {
        'Accept-Language': 'es-ES'
      }
    });
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  // Test Name: Búsqueda exitosa con datos válidos
  // Objetivo: Validar que el formulario permite realizar una búsqueda completa con destino y fechas correctas (clase de equivalencia válida).
  // Datos de entrada: Destino "Madrid", check-in a 30 días desde hoy, check-out a 33 días desde hoy.
  // Resultado esperado: Se redirige a la página de resultados con el destino en la URL y la lista de alojamientos visible.
  it('debería permitir una búsqueda válida con destino y fechas futuras', () => {
    const checkIn = formatDate(30);
    const checkOut = formatDate(33);

    cy.get('input[name="ss"]').clear().type('Madrid');
    cy.get('[data-testid="date-display-field-start"]').click();
    cy.get(`[data-date="${checkIn}"]`).click();
    cy.get(`[data-date="${checkOut}"]`).click();
    cy.get('button[type="submit"]').click();

    cy.url({ timeout: 20000 }).should('include', 'Madrid');
    cy.get('[data-testid="property-card"]', { timeout: 20000 }).should('exist');
  });

  // Test Name: Validación de destino obligatorio
  // Objetivo: Confirmar que el sistema evita búsquedas sin destino seleccionado (clase de equivalencia inválida).
  // Datos de entrada: Destino vacío, fechas automáticas.
  // Resultado esperado: Se muestra un mensaje de error solicitando ingresar el destino.
  it('debería mostrar un error cuando el destino está vacío', () => {
    cy.get('input[name="ss"]').clear();
    cy.get('button[type="submit"]').click();

    cy.contains(/Introduce tu destino|Please enter your destination/i, { timeout: 10000 }).should('be.visible');
  });

  // Test Name: Validación de fecha mínima
  // Objetivo: Verificar que el sistema no permita seleccionar una fecha de salida anterior a la fecha de entrada (valores límite).
  // Datos de entrada: Destino "Lisboa", check-in a 25 días desde hoy, intento de check-out a 24 días.
  // Resultado esperado: La fecha inválida aparece deshabilitada en el calendario.
  it('debería bloquear fechas de salida anteriores al check-in', () => {
    const checkIn = formatDate(25);
    const invalidCheckout = formatDate(24);

    cy.get('input[name="ss"]').clear().type('Lisboa');
    cy.get('[data-testid="date-display-field-start"]').click();

    cy.get(`[data-date="${invalidCheckout}"]`).should('have.attr', 'aria-disabled', 'true');
    cy.get(`[data-date="${checkIn}"]`).click();
    cy.get(`[data-date="${invalidCheckout}"]`).should('have.attr', 'aria-disabled', 'true');
  });

  // Test Name: Configuración de ocupación por combinación de valores
  // Objetivo: Validar que la combinación de 2 adultos y 1 menor se refleja correctamente en la búsqueda (combinación por pares).
  // Datos de entrada: Destino "París", check-in a 40 días, check-out a 44 días, 2 adultos, 1 menor de 10 años.
  // Resultado esperado: La URL de resultados contiene los parámetros de ocupación esperados.
  it('debería conservar la configuración de ocupación al realizar la búsqueda', () => {
    const checkIn = formatDate(40);
    const checkOut = formatDate(44);

    cy.get('input[name="ss"]').clear().type('París');
    cy.get('[data-testid="date-display-field-start"]').click();
    cy.get(`[data-date="${checkIn}"]`).click();
    cy.get(`[data-date="${checkOut}"]`).click();

    cy.get('[data-testid="occupancy-config"]').click();
    cy.get('button[aria-label="Increase number of Children"]').click();
    cy.get('select[name="age"]').first().select('10');
    cy.get('[data-testid="occupancy-config"]').click();

    cy.get('button[type="submit"]').click();

    cy.url({ timeout: 20000 }).should('include', 'group_children=1');
    cy.url().should('include', 'age=10');
  });
});
