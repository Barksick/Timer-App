describe('User Profile Page', () => {
  const testUser = {
    name: 'John Doe',
    sex: 'Male',
    dob: '1990-01-01',
    email: 'john@example.com',
    password: 'Password1!',
  };

  beforeEach(() => {
    cy.visit('/profile');
    cy.window().then((win) => {
      win.localStorage.setItem('reduxState', JSON.stringify({
        user: {
          currentUser: testUser,
          users: [testUser],
        }
      }));
    });
    cy.reload();
  });

  it('displays user data', () => {
    cy.contains('User Profile');
    cy.contains('Name').next().should('contain', testUser.name);
    cy.contains('Sex').next().should('contain', testUser.sex);
    cy.contains('Date of birth').next().should('contain', testUser.dob);
    cy.contains('Email').next().should('contain', testUser.email);
  });

  it('logs out and redirects to login', () => {
    cy.contains('button', 'Log out').click();
    cy.url().should('include', '/login');
    cy.get('input[type="email"]').should('exist');
  });

  it('navigates to User Profile page via UserProfileButton', () => {
    cy.contains('button', 'User Profile').click();
    cy.url().should('include', '/profile');
    cy.contains('User Profile');
  });

  it('navigates to About App page via AboutAppButton', () => {
    cy.contains('button', 'About App').click();
    cy.url().should('include', '/about');
    cy.contains('About App');
  });

  it('navigates to main timer page via Simple Timer title click', () => {
    cy.contains('Simple Timer').click();
    cy.url().should('include', '/timer');
  });
});
