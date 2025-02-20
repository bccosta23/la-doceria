const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")


let cart = [];

/* Abrir modal do carrinho */
cartBtn.addEventListener("click", function() {
    cartModal.style.display = "flex";  // Abre o modal
    cartBtn.classList.add("hidden");  // Esconde o botão do carrinho
    updateCartModal();
});

// Fechar modal do carrinho //
cartModal.addEventListener("click", function(event) {
    if (event.target === cartModal) {
        cartModal.style.display = "none";  // Fecha o modal
        cartBtn.classList.remove("hidden");  // Mostra o botão do carrinho novamente
    }
});

closeModalBtn.addEventListener("click", function() {
    cartModal.style.display = "none";  // Fecha o modal ao clicar no botão de fechar
    cartBtn.classList.remove("hidden");  // Mostra o botão do carrinho novamente
});



menu.addEventListener("click", function(event){
    //console.log(event.target)///
    let parentButton = event.target.closest(".add-to-cart-btn")

    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))
        addToCart(name, price)
    }
})

// Função para adicionar no carrinho //
function addToCart(name, price){
    const existingItem = cart.find(item => item.name === name)

    if(existingItem){
        existingItem.quantity += 1;
    } else {
        cart.push({
         name,
         price,
         quantity: 1,
        })
    }

    mostrarToast(`Adicionado ao Carrinho!`);
    updateCartModal(); // Depois atualiza o carrinho 
}

// Atualizar carrinho
function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");

        cartItemElement.innerHTML = `
            <div class="flex items-center justify-between bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 divide-y mb-2 mt-2 mr-1 p-2">
                <div class="flex flex-col">
                    <p class="font-bold">${item.name}</p>
                    <div class="flex items-center gap-1">
                        <label for="counter-${item.name}" class="text-sm font-medium text-gray-900 dark:text-white">Qtd:</label>
                        <div class="max-w-xs gap-2">
                            <div class="relative flex items-center">
                                <button type="button" data-name="${item.name}" class="decrement-button shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                    <svg class="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
                                    </svg>
                                </button>
                                <input type="text" id="counter-${item.name}" class="counter-input shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" value="${item.quantity}" readonly />
                                <button type="button" data-name="${item.name}" class="increment-button shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                    <svg class="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <p class="font-medium mt-2">SubTotal&nbsp;R$: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button class="remove-from-cart-btn" data-name="${item.name}">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                    </svg>
                </button>
            </div>
        `;

        total += item.price * item.quantity;
        cartItemsContainer.appendChild(cartItemElement);
    });

    // Atualizar total e quantidade no carrinho
    cartTotal.textContent = total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    cartCounter.innerHTML = cart.length;
}
    

// Função para aumentar a quantidade
function increaseItemQuantity(name){
    const item = cart.find(item => item.name === name);
    if(item){
        item.quantity += 1;
        updateCartModal();
    }
}

// Função para diminuir a quantidade
function decreaseItemQuantity(name){
    const item = cart.find(item => item.name === name);
    if(item){
        if(item.quantity > 1){
            item.quantity -= 1;
        } else {
            removeItemCart(name);
        }
        updateCartModal();
    }
}

// Event listener para o botão de remover item do carrinho
cartItemsContainer.addEventListener("click", function (event){
    if(event.target.closest(".remove-from-cart-btn")){
        const name = event.target.closest(".remove-from-cart-btn").getAttribute("data-name");
        removeItemCart(name);
    }

    // Eventos de incremento e decremento de quantidade
    if (event.target.closest(".increment-button")) {
        const name = event.target.closest(".increment-button").getAttribute("data-name");
        increaseItemQuantity(name);
    }

    if (event.target.closest(".decrement-button")) {
        const name = event.target.closest(".decrement-button").getAttribute("data-name");
        decreaseItemQuantity(name);
    }
});

function removeItemCart(name) {
    // Encontrar o índice do item no carrinho
    const index = cart.findIndex(item => item.name === name);
    if (index !== -1) {
        // Remover o item do carrinho
        cart.splice(index, 1);
        mostrarToastErro('Item removido do carrinho!')
        updateCartModal();  // Atualiza a modal após a remoção
      

    }
}

addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value;
    if(inputValue !== ""){
        addressInput.classList.remove("border-red-500");
        addressWarn.classList.add("hidden")
    }
})

// Finalizar Pedido
checkoutBtn.addEventListener("click", function(){

    const isOpen = checkRestaurantOpen();
    if(!isOpen){
        Toastify({
            text:  "🍦 Poxa, deu vontade de um cone agora? Infelizmente, estamos fechados! Mas fica tranquilo, logo abrimos das 18:00 às 22:00. Segura a vontade aí! 😅",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
             background: "#ef4444",
            },
         onClick: function(){} // Callback after click
        }).showToast();
        return;
    }
    
    if(cart.length === 0) return;
    if(addressInput.value === ""){
       addressWarn.classList.remove("hidden")
       addressInput.classList.add("border-red-500")
       return;   
    }
 
   // Enviar Pedido WhatsApp
    const cartItems = cart.map((item) => {
      return `${item.name} Quantidade: (${item.quantity}) Preço: R$${item.price} \n`
    }).join("");

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalMessage = `Total: R$${total.toFixed(2)}\n`;

    const message = encodeURIComponent(cartItems + "Endereço: " + addressInput.value + "\n" + totalMessage);
    const phone = "82996086294";

    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");


    cart = [];
    updateCartModal();
})

// Verificar hora e manipular card horário
function checkRestaurantOpen(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora < 22;
    // true = loja está aberta 
}

const spanItem = document.getElementById("date-span")
const isOpen = checkRestaurantOpen();

if(isOpen){
    spanItem.classList.remove("bg-red-500")
    spanItem.classList.add("bg-green-500")
} else {
    spanItem.classList.remove("bg-green-500")
    spanItem.classList.add("bg-red-500")
}
