beforeEach(() => {
  cy.viewport(860, 640)
  cy.visit('http://localhost:3000')
})

describe('1 - After initial render', () => {
  it('should render Inventory cells according to inventory size', () => {
    cy.get('div.cell').should('have.length', 35)
  })

  it('should have one initial item', () => {
    cy.get('div#item-0')
    cy.get('div#item-1').should('not.exist')
  })
})

describe('3 - Inventory weight', () => {
  it('should be the sum of inventory items weight', () => {
    cy.get('#total-inventory-weight').should('contain.text', ': 100g')
  })
})

describe('4 - Clear inventory button', () => {
  it('should remove all inventory items', () => {
    cy.get('#total-inventory-weight').should('contain.text', ': 100g')
    cy.get('#clear-inventory').click()
    cy.get('#total-inventory-weight').should('contain.text', ': 0g')
  })
})

describe('5 - When dragging over own item', () => {
  it('should stay behind cells', () => {
    cy.get('div#item-0')
      .contains('red apple')
      .move({ deltaX: 10, deltaY: 10, force: true })
    cy.get('.hidden').should('exist')
  })

  it('should appear the available shadow', () => {
    cy.get('div#item-0')
      .drag('.cell-4', { force: true })

    cy.get('.drag-over-available').should('exist')
  })
})

describe('6 - When dropping over available space', () => {
  it('available shadow should appear and item position should update', () => {
    cy.get('div#item-0').first()
      .contains('red apple')
      .drag('.cell-5', { force: true })
    cy.get('.drag-over-available').should('exist')
    cy.wait(100)
    cy.get('div#item-0').first()
      .drag('.cell-6', { force: true })
    cy.get('.drag-over-available').should('not.exist')
  })
})

describe('7 - When dropping over unavailable space', () => {
  it('unavailable shadow should appear and item position remains the same', () => {
    cy.get('div.outside-item').last()
      .drag('.cell-5')
    cy.get('.drag-over-unavailable').should('exist')
  })
})

describe('8 - When dragging outside item to the inventory and theres available space', () => {
  it('should stay in the inventory', () => {
    cy.get('div.outside-item').first()
      .drag('.cell-5')
    cy.wait(100)
    cy.get('div#item-1').should('exist')
  })
})

describe('9 - When dragging outside item to the inventory and theres no available space', () => {
  it('should not go to the inventory and a no space message shall appear', () => {
    cy.on('window:alert', (message) => {
      expect(message).to.equal('No space')
    })

    cy.get('div.outside-item').last()
      .drag('.cell-5')
  })
})

describe('10 - When dropping inventory item outside the inventory', () => {
  it('should be removed and a delete message shall appear', () => {
    cy.on('window:confirm', (message) => {
      expect(message).to.equal('Delete item?')
    })

    cy.get('div#item-0').move({ deltaX: -200, force: true })
  })
})
