describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login("mbedia94@gmail.com", "Abc123...!")
  })


  it('can post a meow', () => {

  })
})