describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should load the home page", () => {
    cy.url().should("include", "/");
  });

  it("should display the Next.js logo", () => {
    cy.get("img[alt='Next.js logo']").should("be.visible");
  });

  it("should have a link to the Next.js docs", () => {
    cy.get("a").contains("Docs").should("exist");
  });

  it("should have a link to deploy on Vercel", () => {
    cy.get("a").contains("Deploy now").should("exist");
  });
});
