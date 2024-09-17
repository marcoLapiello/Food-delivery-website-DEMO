// Initializes main functions
function init() {
  getCartFromLocalStorage();
  renderMainDishes();
  renderCart();
}

// loads data from local storage and if no data there, it returns an empty cart array
function getCartFromLocalStorage() {
  myCartProducts = JSON.parse(localStorage.getItem("cart")) || [];
}

// Saves changes occurring in the cart array, to local storage
function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(myCartProducts));
}

//Products get loaded
function renderMainDishes() {
  let foodRef = document.getElementById("foodContent");
  foodRef.innerHTML = "";

  for (let indexMain = 0; indexMain < myPizzas.length; indexMain++) {
    foodRef.innerHTML += getMainDishesTemplate(indexMain);
  }
}

function renderSideDishes() {
  let foodRef = document.getElementById("foodContent");
  foodRef.innerHTML = "";

  for (let indexSides = 0; indexSides < mySideDishes.length; indexSides++) {
    foodRef.innerHTML += getSideDishesTemplate(indexSides);
  }
}

//checks if main dish is already contained in the cart - if yes, it just increases the amount
// If not, it adds the new product to the cart
function addMainToCart(indexMain) {
  let existingProduct = myCartProducts.find(
    (product) => product.name === myPizzas[indexMain].name
  );

  if (existingProduct) {
    existingProduct.amount++;
  } else {
    // This "..." is an operator to copy all properties of the object
    let newProduct = { ...myPizzas[indexMain], amount: 1 };
    myCartProducts.push(newProduct);
  }
  saveCartToLocalStorage();
  renderCart();
}

//checks if side dish is already contained in the cart - if yes, it just increases the amount
// If not, it adds the new product to the cart
function addSidesToCart(indexSides) {
  let existingProduct = myCartProducts.find(
    (product) => product.name === mySideDishes[indexSides].name
  );

  if (existingProduct) {
    existingProduct.amount++;
  } else {
    // This "..." is an operator to copy all properties of the object
    let newProduct = { ...mySideDishes[indexSides], amount: 1 };
    myCartProducts.push(newProduct);
  }
  saveCartToLocalStorage();
  renderCart();
}

// Cart get loaded as soon it contains produkt
function renderCart() {
  let cartRef = document.getElementById("cartFoodPlace");
  cartRef.innerHTML = "";

  for (let indexCart = 0; indexCart < myCartProducts.length; indexCart++) {
    cartRef.innerHTML += getCartTemplate(indexCart);
  }

  renderCartCosts();
  renderCartQuantity();
}

function renderCartQuantity() {
  let cartQuantityRef = document.getElementById("cartCurrentQuantity");
  cartQuantityRef.innerHTML = myCartProducts.length;
}

// Cart subtotal and total get calculated and rendered
function renderCartCosts() {
  let subTotalRef = document.getElementById("subTotal");
  subTotalRef.innerHTML = "";
  let totalRef = document.getElementById("total");
  totalRef.innerHTML = "";

  const delivery = 5;
  let sum = 0;

  for (let indexCart = 0; indexCart < myCartProducts.length; indexCart++) {
    sum += myCartProducts[indexCart].price * myCartProducts[indexCart].amount;
  }

  subTotalRef.innerHTML = sum.toFixed(2) + "€";
  myCartProducts.length > 0 ? (totalRef.innerHTML = (sum + delivery).toFixed(2) + "€") : (totalRef.innerHTML = "0,00€");
}

// Remove the product entirely from the cart
function removeFromCart(indexCart) {
  myCartProducts.splice(indexCart, 1);
  saveCartToLocalStorage();
  renderCart();
}

// decrease the amount of the product in the cart and remove it if the amount reach 0
function decreaseAmount(indexCart) {
  if (myCartProducts[indexCart].amount > 1) {
    myCartProducts[indexCart].amount--;
  } else {
    myCartProducts.splice(indexCart, 1);
  }
  saveCartToLocalStorage();
  renderCart();
}

// decrease the amount of the product in the cart
function increaseAmount(indexCart) {
  myCartProducts[indexCart].amount++;
  saveCartToLocalStorage();
  renderCart();
}

// Show Cart and Hide main Content if the cart btn is clicked(till max-Width 768px)
function showCart() {
  let cart = document.getElementById("basket");
  cart.classList.toggle("cartDisplay");

  let content = document.getElementById("mainContent");
  content.classList.toggle("contentDNone");
}

// Sends Order, removes all elements from the cart and opens
// the order confirmation page
function order(event) {
  event.preventDefault();
  if (myCartProducts.length === 0) {
    alert("Bitte, suche dir erstmal was leckeres aus!");
  } else {
    myCartProducts = [];
    saveCartToLocalStorage();
    
    window.location.href = "./orderConfirmed.html";
  }
}

// closes the order confirmation page
function backToShop(event) {
  
  event.preventDefault();
  window.location.href = "./home.html";
}
