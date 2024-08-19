const mockCredentials = {
  email: 'user3@example.com',
  password: 'password123',
  firstName: 'Joe',
  lastName: 'Best'
}

describe('Add Income or Expense', () => {
  it('should allow a user to log in or register', () => {
    cy.visit('/login');

    cy.get('input[name="email"]').type(mockCredentials.email);
    cy.get('input[name="password"]').type(mockCredentials.password);
    cy.get('button[type="submit"]').click();

    cy.get('input[name="email"]').then(($btn) => {
      if ($btn.hasClass('ring-red-500')) {
        // If login failed, switch to registration form and register

        cy.get('button.js-sign-in').click(); // Switch to Sign Up form

        cy.get('input[name="firstName"]').type(mockCredentials.firstName);
        cy.get('input[name="lastName"]').type(mockCredentials.lastName);
        cy.get('input[name="email"]').type(mockCredentials.email);
        cy.get('input[name="password"]').type(mockCredentials.password);

        cy.get('button[type="submit"]').click();
      }

      cy.contains('Dashboard')
    })
  });
});
