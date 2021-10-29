/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('to-do app', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('https://todomvc.com/examples/react/#/')
  })

  it('displays zero todo items by default', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.get('.todo-list li').should('have.length', 0)

    // We can go even further and check that the default todos each contain
    // the correct text. We use the `first` and `last` functions
    // to get just the first and last matched elements individually,
    // and then perform an assertion with `should`.
  })

  it('can add new todo items, mark item as complete, delete item and update item ', () => {
    // We'll store our item text in a variable so we can reuse it
    const newItem = 'Feed the cat'

    // Let's get the input element and use the `type` command to
    // input our new list item. After typing the content of our item,
    // we need to type the enter key as well in order to submit the input.
    // This input has a data-test attribute so we'll use that to select the
    // element in accordance with best practices:
    // https://on.cypress.io/selecting-elements
    cy.get('input.new-todo').type(`${newItem}{enter}`)

    // Now that we've typed our new item, let's check that it actually was added to the list.
    // Since it's the newest item, it should exist as the last element in the list.
    // In addition, with the two default items, we should have a total of 3 elements in the list.
    // Since assertions yield the element that was asserted on,
    // we can chain both of these assertions together into a single statement.
    cy.get('.todo-list')
      .should('have.length', 1)
      .last()
      .should('have.text', newItem)
      const newItem2 = 'Feed the dog'

    // Let's get the input element and use the `type` command to
    // input our new list item. After typing the content of our item,
    // we need to type the enter key as well in order to submit the input.
    // This input has a data-test attribute so we'll use that to select the
    // element in accordance with best practices:
    // https://on.cypress.io/selecting-elements
    cy.get('input.new-todo').type(`${newItem2}{enter}`)

    // Now that we've typed our new item, let's check that it actually was added to the list.
    // Since it's the newest item, it should exist as the last element in the list.
    // In addition, with the two default items, we should have a total of 3 elements in the list.
    // Since assertions yield the element that was asserted on,
    // we can chain both of these assertions together into a single statement.
    cy.get('.todo-list li')
      .should('have.length', 2)
      .last()
      .should('have.text', newItem2)

    cy.contains('Feed the dog')
        .parent()
        .find('input[type=checkbox]')
        .check()

    cy.contains('Feed the dog')
      .parents('li')
      .should('have.class', 'completed')

    cy.contains('Active').click()
    cy.get('.todo-list li')
        .should('have.length', 1)
        .first()
        .should('have.text', 'Feed the cat')
    cy.contains('Feed the dog').should('not.exist')

    cy.contains('Clear completed').click()
    cy.get('.todo-list li')
              .should('have.length', 1)
              .first()
              .should('have.text', 'Feed the cat')
      
    cy.contains('Feed the dog').should('not.exist')
    cy.get('.todo-list label').dblclick()
    cy.get('.editing').should('be.visible').type('Edited {enter}')
  })
  

})
