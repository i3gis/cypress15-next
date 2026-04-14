/**
 * Test fitur Cypress 15 yang tidak ada / berbeda di Cypress 12.
 * Dipakai untuk observasi apa yang terjadi saat pipeline downgrade ke Cypress 12.
 */

// ──────────────────────────────────────────────
// 1. Version check — akan gagal di Cypress 12
// ──────────────────────────────────────────────
describe("Cypress Version Check", () => {
  it("should be running Cypress 15", () => {
    const version = Cypress.version;
    const major = parseInt(version.split(".")[0], 10);
    cy.log(`Running Cypress version: ${version}`);
    expect(major).to.be.gte(15);
  });
});

// ──────────────────────────────────────────────
// 2. cy.session() tanpa experimental flag
//    Cypress 12: butuh experimentalSessionAndOrigin: true di config
//    Cypress 13+: built-in, tidak perlu flag
// ──────────────────────────────────────────────
describe("cy.session() — stable API (Cypress 13+)", () => {
  it("should create and restore a session without experimental flag", () => {
    cy.session("demo-session", () => {
      cy.visit("/");
      // Simulasi setup session (misal login)
      cy.window().then((win) => {
        win.sessionStorage.setItem("demo", "cypress15");
      });
    });

    cy.visit("/");
    cy.window().its("sessionStorage").invoke("getItem", "demo").should("eq", "cypress15");
  });
});

// ──────────────────────────────────────────────
// 3. cy.intercept() dengan `times` option
//    Syntax ini ada di Cypress 12 tapi behavior berubah di 14+
// ──────────────────────────────────────────────
describe("cy.intercept() with times option", () => {
  it("should intercept request with times limit", () => {
    cy.intercept({ url: "/", times: 1 }, (req) => {
      req.continue();
    }).as("homeRequest");

    cy.visit("/");
    cy.wait("@homeRequest");
  });
});

// ──────────────────────────────────────────────
// 4. Cypress.require() — ditambahkan di Cypress 12.4
//    Tapi behavior berubah di 15
// ──────────────────────────────────────────────
describe("Cypress.env() and config access", () => {
  it("should access config values (behavior changed in Cypress 15)", () => {
    // Di Cypress 15, cy.config() tidak bisa dipakai di test body
    // Di Cypress 12, ini masih berfungsi
    const baseUrl = Cypress.config("baseUrl");
    cy.log(`baseUrl from config: ${baseUrl}`);
    expect(baseUrl).to.not.be.null;
    expect(baseUrl).to.include("localhost");
  });
});
