describe('Login Page', () => {
  const testUser = {
    email: 'test@example.com',
    password: 'Password1!',
  };

  beforeEach(() => {
    // Записуємо користувача в localStorage перед кожним тестом
    cy.visit('/login');

    cy.window().then((win) => {
      win.localStorage.setItem('reduxState', JSON.stringify({
        user: {
          users: [{ name: 'Test', sex: 'Male', dob: '1990-01-01', ...testUser }],
          currentUser: null,
        }
      }));
    });

    cy.reload();
  });

  it('logs in successfully with correct credentials', () => {
    cy.get('input[type="email"]').type(testUser.email);
    cy.get('input[type="password"]').type(testUser.password);
    cy.contains('button', 'Log in').click();

    cy.url().should('include', '/timer');
  });

  it('shows error message on incorrect login', () => {
    cy.get('input[type="email"]').should('exist').type('wrong@example.com');
    cy.get('input[type="password"]').should('exist').type('WrongPass1!');
    cy.contains('button', 'Log in').click();

    cy.contains('Invalid email or password', { timeout: 5000 }).should('be.visible');

    cy.url().should('include', '/login');
  });

});
