describe('template spec', () => {
  it('Loads UI', () => {
    cy.visit('/')
    cy.url().should('include', 'tasks')
  })
})
