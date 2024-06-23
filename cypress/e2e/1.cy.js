/* Test date: 06/22/2024 */

/*  Test Steps:
1. Visit URL: https://www.ebay.com/sch/ebayadvsearch
2. Enter the data on the input fields
3. Select the option from dropdown menu
4. Check on the checkboxes and radiobuttons
5. Click on Clear Option
6. Verify the the changes made in input fields, dropdown menus, checkboxes/radiobuttons reverts to its initail state
*/

describe('Clear Button Functionality Test', () => {
  let testData;

  beforeEach(() => {
    cy.fixture('searchData').then(data => {
      testData = data;
    });
  });

  it('Verify that clicking clear button removes all the selected/entered search conditions', () => {
    // 1. Visit URL
    cy.visit("/");

    // Assert to test the title of the page
    cy.title().should('eq', "Advanced Search | eBay");

    // 2. Enter the data on the input fields {Datas are retrived from fixtures folder}
    for (const [selector, value] of Object.entries(testData.inputs)) {
      cy.get(selector).type(value);
    }

    // 3. Select the options form dropdown menu
    for (const [selector, value] of Object.entries(testData.selects)) {
      cy.get(selector).select(value);
    }

    // 4. Check on radiobox and checkbox
    testData.checks.forEach(selector => {
      cy.get(selector).check().should('be.checked');
    });

    // 5. Click on Clear options (created custom command)
    cy.clearOptions();

    // 6. Assert to Verify that input fiels are empty
    for (const selector of Object.keys(testData.inputs)) {
      cy.get(selector).should("have.value", '');
    }

    // 6. Assert to Verify that selected options from dropdown menu are cleared and has returned to their initial state.
    function selectOption(selector, optionText) {
      cy.get(selector).select(optionText).then(() => {
        cy.get(`${selector} option:selected`).invoke('text').should('eq', optionText);
      });
    }

    selectOption("[name='_in_kw']", "All words, any order");
    selectOption("[name='_ftrv']", "2 hours");
    selectOption("[name='_ftrt']", "Ending within");
    selectOption("[name='_salic']", "Afghanistan");
    selectOption("[name='_saslop']", "Include");
    selectOption("[name='_sop']", "- Select -");
    selectOption("[name='_dmd']", "- Select -");
    selectOption("[name='_ipg']", "- Select -");

    // 6. Assert to Verify that checked radiobox and checkbox are unchecked
    testData.checks.forEach(selector => {
      cy.get(selector).should('not.be.checked');
    });
  });
});
