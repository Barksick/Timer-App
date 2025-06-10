describe('Work (Timer) Page', () => {
  const currentUser = {
    name: 'Test User',
    email: 'test@example.com',
    sex: 'Male',
    dob: '1990-01-01',
    password: 'Password1!',
  };

  beforeEach(() => {
    cy.visit('/timer');

    cy.window().then((win) => {
      win.localStorage.setItem('reduxState', JSON.stringify({
        user: {
          currentUser,
          users: [],
        }
      }));
    });

    cy.reload();
  });

  it('displays expected content on Work page', () => {
    cy.contains('Simple Timer').should('exist');
    cy.contains('button', 'About App').should('exist');
    cy.contains(/Start/i);
    cy.contains(/Reset/i);
    cy.contains(/Set Timer/i);
  });

  it('displays fields for hours, minutes, and seconds input', () => {
    cy.contains('label', 'Hours').should('exist').parent().find('input').should('exist');
    cy.contains('label', 'Minutes').should('exist').parent().find('input').should('exist');
    cy.contains('label', 'Seconds').should('exist').parent().find('input').should('exist');
  });

  it('navigates to User Profile page when clicking User Profile button', () => {
    cy.contains('button', 'User Profile').click();
    cy.url().should('include', '/profile');
    cy.contains('User Profile');
  });

  it('navigates to About App page when clicking About App button', () => {
    cy.contains('button', 'About App').click();
    cy.url().should('include', '/about');
    cy.contains('This app is designed to help you keep track of time');
  });

  it('clicking on title navigates to /timer', () => {
    cy.contains('Simple Timer').click();
    cy.url().should('include', '/timer');
  });

  it('sets timer and counts down', () => {
    // Встановити значення: 0 год, 0 хв, 3 сек
    cy.contains('label', 'Hours').parent().find('input').clear().type('0');
    cy.contains('label', 'Minutes').parent().find('input').clear().type('0');
    cy.contains('label', 'Seconds').parent().find('input').clear().type('3');

    cy.contains('button', 'Set Timer').click();
    cy.contains(/^00:00:03$/); // перевірка відображення

    cy.contains('button', 'Start').click();

    // Через 4 секунди очікуємо завершення таймера
    cy.wait(4000);

    cy.contains(/^00:00:00$/);
    cy.contains('⏰ Time is up!');
  });

  it('pauses the timer when Pause is clicked', () => {
    // Встановлення 5 секунд
    cy.contains('label', 'Seconds').parent().find('input').clear().type('5');
    cy.contains('button', 'Set Timer').click();
    cy.contains('button', 'Start').click();

    cy.wait(2000);
    cy.contains('button', 'Pause').click();

    // Запам’ятовуємо поточне значення таймера
    cy.get('h1').invoke('text').then((textBefore) => {
        cy.wait(2000);
        cy.get('h1').should('have.text', textBefore); // Значення не повинно змінитися
    });
  });

  it('resets timer and inputs when Reset is clicked', () => {
    cy.contains('label', 'Seconds').parent().find('input').clear().type('7');
    cy.contains('button', 'Set Timer').click();

    cy.contains('button', 'Reset').click();

    cy.contains('label', 'Hours').parent().find('input').should('have.value', '0');
    cy.contains('label', 'Minutes').parent().find('input').should('have.value', '0');
    cy.contains('label', 'Seconds').parent().find('input').should('have.value', '0');

    cy.contains(/^00:00:00$/);
  });

  it('shows alert for invalid time input', () => {
    cy.contains('label', 'Minutes').parent().find('input').clear().type('99');
    cy.contains('button', 'Set Timer').click();
    cy.on('window:alert', (str) => {
        expect(str).to.include('Please enter valid numbers');
    });
  });

  it('shows alert if total time is 0', () => {
    // Очистити всі поля
    cy.contains('label', 'Hours').parent().find('input').clear().type('0');
    cy.contains('label', 'Minutes').parent().find('input').clear().type('0');
    cy.contains('label', 'Seconds').parent().find('input').clear().type('0');

    // Натиснути кнопку
    cy.contains('button', 'Set Timer').click();

    // Перевірка алерту
    cy.on('window:alert', (text) => {
        expect(text).to.include('Please set a time greater than 0');
    });
  });

  it('does not start timer if time is 0', () => {
    cy.contains('button', 'Start').click();
    cy.get('h1').should('contain', '00:00:00'); // час не змінився
  });

  it('sets timer only if total seconds > 0', () => {
    cy.contains('label', 'Minutes').parent().find('input').clear().type('1');
    cy.contains('button', 'Set Timer').click();
    cy.get('h1').should('not.contain', '00:00:00');
  });

});
