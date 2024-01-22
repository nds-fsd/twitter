describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  })


  it('can click login button', () => {
    const loginButton = cy.contains("Login");
    loginButton.click()
    cy.get("[name=mail]").focus().type("mbedia94@gmail.com");
    cy.get("[name=password]").focus().type("Abc123...!");
    cy.contains("Log in").click();
    cy.get(".textsContainer").should("be.visible")
  })
})