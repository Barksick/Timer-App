describe('About App Page', () => {
  beforeEach(() => {
    cy.visit('/about');

    // Імітуємо наявність залогіненого користувача
    cy.window().then((win) => {
      win.localStorage.setItem('reduxState', JSON.stringify({
        user: {
          currentUser: {
            name: 'Test User',
            email: 'test@example.com',
            sex: 'Male',
            dob: '1990-01-01',
            password: 'Password1!',
          },
          users: [],
        }
      }));
    });

    cy.reload();
  });

  it('displays about information', () => {
    cy.contains('About App').should('be.visible');
    cy.contains('This app is designed to help you keep track of time').should('be.visible');
    cy.contains('countdown in real time').should('be.visible');
  });

  it('navigates to User Profile page via UserProfileButton', () => {
    cy.contains('button', 'User Profile').click();
    cy.url().should('include', '/profile');
    cy.contains('User Profile');
  });

  it('stays on About App page when AboutAppButton is clicked', () => {
    cy.contains('button', 'About App').click();
    cy.url().should('include', '/about');
    cy.contains('About App');
  });

  it('navigates to timer page when clicking on Simple Timer title', () => {
    cy.contains('Simple Timer').click();
    cy.url().should('include', '/timer');
  });
});
