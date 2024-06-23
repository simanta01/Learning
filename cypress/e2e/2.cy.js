/* Test date: 06/22/2024 */

/*  Test Steps:
1. Visit URL: https://www.ebay.com/sch/ebayadvsearch
2. Click on Keyword Option dropdown menu and Verify the options are in the following order:
                    All words, any order
                    Any words, any order
                    Exact words, exact order
                    Exact words, any order
3. Select any option and Verify that the select option's name is displayed on the dropdown menu field.
*/

describe('Verify the dropdown menu option in Kewword Options', () => {
    it('Check the order of the option and Selection Functionalty', () => {
        // 1. Visit URL
        cy.visit("https://www.ebay.com/sch/ebayadvsearch");
        
        // 2. Assert to verify the order of the option in the dropdown menu
        cy.get("[name='_in_kw'] option").each(($option, index) => {
            switch (index) {
                case 0:
                    cy.wrap($option).should('have.text', 'All words, any order');
                    break;
                case 1:
                    cy.wrap($option).should('have.text', 'Any words, any order');
                    break;
                case 2:
                    cy.wrap($option).should('have.text', 'Exact words, exact order');
                    break;
                case 3:
                    cy.wrap($option).should('have.text', 'Exact words, any order');
                    break;
            }
        });

        // 3. Assert to verify the selected option's name is displayed on the dropdown menu field.         
        function optionName(optionText) {
            cy.get("[name='_in_kw']").select(optionText).then(() => {
                cy.get("[name='_in_kw'] option:selected").invoke('text').should('eq', optionText);
            });
        }

        optionName("Exact words, any order");
        optionName("All words, any order");
        optionName("Any words, any order");
        optionName("Exact words, exact order");
    });
});