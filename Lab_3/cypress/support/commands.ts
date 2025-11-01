// You can add custom Cypress commands here if needed for the Booking automation flows.

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Inicia sesión en Booking.com con credenciales de ejemplo antes de ejecutar las pruebas.
       * Recuerda reemplazar el correo y la contraseña por valores reales antes de ejecutar en tu entorno.
       */
      loginToBooking(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('loginToBooking', () => {
  const credentials = {
    email: 'demo.usuario@example.com',
    password: 'DemoPassword123!'
  };

  cy.visit('/', {
    headers: {
      'Accept-Language': 'es-ES'
    }
  });
  cy.viewport(1280, 720);

  cy.get('[data-testid="header-sign-in-button"]', { timeout: 15000 }).click();

  cy.origin(
    'https://account.booking.com',
    { args: credentials },
    ({ email, password }) => {
      cy.get('input[type="email"]').should('be.visible').clear().type(email);
      cy.get('button[type="submit"]').click();

      cy.get('input[type="password"]').should('be.visible').type(password, { log: false });
      cy.get('button[type="submit"]').click();
    }
  );

  cy.origin('https://www.booking.com', () => {
    cy.get('body').should('be.visible');
  });

  cy.visit('/', {
    headers: {
      'Accept-Language': 'es-ES'
    }
  });
});

export {};
