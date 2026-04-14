import { defineConfig } from "cypress";
import { cloudPlugin } from "cypress-cloud/plugin";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:{{changeThisPort}}",
    specPattern: "cypress/e2e/**/*.cy.{js,ts}",
    supportFile: "cypress/support/e2e.ts",
    viewportWidth: 1280,
    viewportHeight: 720,
    async setupNodeEvents(on, config) {
      const result = await cloudPlugin(on, config);
      return result;
    },
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    specPattern: "cypress/component/**/*.cy.{js,ts,jsx,tsx}",
    supportFile: "cypress/support/component.ts",
  },
});
