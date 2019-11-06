import { cy } from 'cypress';

describe("Appointment", () => {

  beforeEach(() => {
    cy.request("GET", "/api/debug/reset")
      .visit("/")
      .contains("Monday")
  })

  it("should book an interview", () => {
    cy.get("[alt=Add]").first().click()
      .get("[data-testid=student-name-input]").type("Lydia Miller-Jones")
      .get("[alt='Sylvia Palmer']").click()
    cy.contains("Save").click()
    cy.contains(".appointment__card--show", "Lydia Miller-Jones")
      .contains(".appointment__card--show", "Sylvia Palmer")
  })

  it("should edit an interview", () => {
    cy.get(".appointment__card-left")
      .trigger("mouseover")
    cy.get("[alt=Edit]").invoke("show").click()
    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']").click()
    cy.contains("Save").click()

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  })

  it("should cancel an interview", () => {
    cy.get(".appointment__card-left")
      .trigger("mouseover")
    cy.get("[alt=Delete]").invoke("show").click()
    cy.contains("Confirm").click()
    cy.contains("Deleting").should("exist")
    cy.get("Deleting").should("not.exist")
    cy.contains(".appointment__card--show", "Archie Cohon").should("not.exist")
  })
});