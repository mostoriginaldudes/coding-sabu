describe('홈', () => {
  it('홈 접근', () => {
    cy.visit('/');

    cy.get('ol>li').should('have.length.at.least', 3);
  });
});
