describe('User Registration Page', () => {
  const fillRegistrationForm = (user) => {
    cy.contains('label', 'Name').parent().find('input').type(user.name);
    cy.contains('label', 'Sex').parent().click();
    cy.get('ul[role="listbox"]').contains(user.sex).click();
    cy.contains('label', 'Date of birth').parent().find('input').type(user.dob);
    cy.contains('label', 'Email').parent().find('input').type(user.email);
    cy.contains('label', 'Password').parent().find('input').type(user.password);
  };

  beforeEach(() => {
    // Скидаємо localStorage перед кожним тестом
    cy.visit('/register', {
      onBeforeLoad(win) {
        win.localStorage.removeItem('reduxState');
      }
    });
  });

  it('registers a new user with valid data', () => {
    const newUser = {
      name: 'Alice Tester',
      sex: 'Female',
      dob: '1995-06-09',
      email: 'alice@example.com',
      password: 'Testpass1!',
    };

    fillRegistrationForm(newUser);
    cy.contains('button', /create an account/i).click();

    cy.url().should('include', '/login');
    cy.contains(/log in/i).should('exist');
  });

  it('should navigate to login page when clicking Back to log in', () => {
    cy.contains('Back to log in').click();
    cy.url().should('include', '/login');
  });

  it('should show an error if required fields are empty', () => {
    cy.contains('Create an account').click();
    cy.contains('All fields are required').should('be.visible');
  });

  it('should show an error for weak password', () => {
    const user = {
      name: 'Taras Running',
      sex: 'Male',
      dob: '1960-07-09',
      email: 'taras@example.com',
      password: 'Testpass1', // no special character
    };

    fillRegistrationForm(user);
    cy.contains('Create an account').click();
    cy.contains(
      'Password must be 8–30 characters long and include at least one digit and one special character'
    ).should('be.visible');
  });

  it('should show an error for invalid email', () => {
    const user = {
      name: 'Igor Testing',
      sex: 'Male',
      dob: '1990-07-09',
      email: 'alice-example.com', // invalid email
      password: 'Testpass1!',
    };

    fillRegistrationForm(user);
    cy.contains('Create an account').click();
    cy.contains('Invalid email format').should('be.visible');
  });

  it('should show an error for future date of birth', () => {
    const user = {
      name: 'Alien',
      sex: 'Female',
      dob: '2999-07-09', // future date
      email: 'qwerty@example.com',
      password: 'Testpass1!',
    };

    fillRegistrationForm(user);
    cy.contains('Create an account').click();
    cy.contains('Date of birth cannot be in the future').should('be.visible');
  });

  it('should show error when registering with an existing email', () => {
    const existingUser = {
      name: 'Test User',
      sex: 'Male',
      dob: '1990-01-01',
      email: 'test@example.com',
      password: 'Password1!',
    };

    // Додаємо користувача в localStorage
    cy.visit('/register', {
      onBeforeLoad(win) {
        const reduxState = {
          user: {
            users: [existingUser],
            currentUser: null,
          },
        };
        win.localStorage.setItem('reduxState', JSON.stringify(reduxState));
      }
    });

    // Тестуємо повторну реєстрацію
    const duplicateUser = {
      ...existingUser,
      name: 'Test User',
      sex: 'Female',
    };

    fillRegistrationForm(duplicateUser);
    cy.contains('Create an account').click();
    cy.contains('User with this email already exists').should('be.visible');
  });
});
