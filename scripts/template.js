function getMainDishesTemplate(indexMain) {
  return /*html*/ `
          <div id="food${indexMain}" class="food">
              <h3>${myPizzas[indexMain].name}</h3>
              <div class="foodTooltipWrapper">
                <div class="foodTooltip">Zutaten
                  <span class="foodTooltipText">${myPizzas[indexMain].description}</span>
                </div>
              </div>
              
              
              <span>${myPizzas[indexMain].price.toFixed(2)}€</span>
              <button id = "addBasketBtn${indexMain}" onclick= addMainToCart(${indexMain})>+</button>
            </div>
      `;
}

function getSideDishesTemplate(indexSides) {
  return /*html*/ `
          <div id="food${indexSides}" class="food">
              <h3>${mySideDishes[indexSides].name}</h3>
              <div class="foodTooltipWrapper">
                <div class="foodTooltip">Zutaten
                  <span class="foodTooltipText">${mySideDishes[indexSides].description}</span>
                </div>
              </div>
              
              <span>${mySideDishes[indexSides].price.toFixed(2)}€</span>
              <button id = "addBasketBtn${indexSides}" onclick= addSidesToCart(${indexSides})>+</button>
            </div>
      `;
}

function getCartTemplate(indexCart) {
  return /*html*/ `
          <h4>${myCartProducts[indexCart].name}</h4>
                  <div id="quantityPrice" class="styleQuantityPrice">
                      <div id="quantity" class="styleQuantity">
                          <button id = "cartProduktDecrease" onclick=decreaseAmount(${indexCart})>-</button>
                          <span>${myCartProducts[indexCart].amount}</span>
                          <button id = "cartProduktIncrease" onclick=increaseAmount(${indexCart})>+</button>
                      </div>
                      <div id="price" class="stylePrice">
                          <span>${(
                            myCartProducts[indexCart].price *
                            myCartProducts[indexCart].amount
                          ).toFixed(2)} €</span>
                          <button id = "cartProduktRemove" onclick=removeFromCart(${indexCart})>🗑️</button>
                      </div>
                  </div>
      `;
}
