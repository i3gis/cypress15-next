describe("Navigation", () => {
  it("should navigate to the home page", () => {
    cy.visit("/");
    cy.url().should("include", "/");
  });

  it("should have correct page title", () => {
    cy.visit("/");
    cy.title().should("not.be.empty");
  });
});
