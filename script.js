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
cartBtn.addEventListener("click", function(){
    cartModal.style.display = "flex"
    updateCartModal();
})

// Fechar modal do carrinho //
cartModal.addEventListener("click", function(event){
    if(event.target === cartModal){
        cartModal.style.display = "none"
    }
})

closeModalBtn.addEventListener("click", function(){
    cartModal.style.display = "none"
})


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

    mostrarToast(`${name} adicionado ao carrinho!`);
    updateCartModal(); // Depois atualiza o carrinho
    /* showToast('Intem adicionado!','top-right');
 */
    
}

// Atualizar carrinho //
function updateCartModal(){
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
       const cartItemElement  = document.createElement("div");

       cartItemElement.innerHTML = `
            <div 
              class="flex items-center justify-between bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 divide-y mb-2 mt-2 mr-1"
            >
                <div class="flex flex-col">
                  <p class="font-bold">${item.name}</p>
                    <div class="flex items-center gap-1">
                        <p> Qtd: ${item.quantity}</p>
                        <div class="flex flex-col gap-0.5">
                           <!-- Botão para aumentar quantidade (seta para cima) -->
                            <button class="increase-quantity-btn" data-name="${item.name}">
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" 
                                    aria-hidden="true" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="24" height="24" fill="none" 
                                    viewBox="0 0 24 24">
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                    d="m16 14-4-4-4 4"/>
                                </svg>
                            </button>
                           <!-- Botão para diminuir quantidade (seta para baixo) -->
                            <button class="decrease-quantity-btn" data-name="${item.name}">
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" 
                                    aria-hidden="true" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="24" height="24" fill="none" 
                                    viewBox="0 0 24 24">
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                    d="m8 10 4 4 4-4"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                  <p class="font-medium mt-2 ">SubTotal&nbsp;R$: ${item.price.toFixed(2)}</p>
                </div>

                <button class="remove-from-cart-btn" data-name="${item.name}">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" 
                        aria-hidden="true" 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" height="24" fill="none" 
                        viewBox="0 0 24 24">
                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                    </svg>
                </button>
            </div>
        `;

        total += item.price * item.quantity;
        cartItemsContainer.appendChild(cartItemElement)
    })

    cartTotal.textContent = total.toLocaleString("pt-BR",{
        style: "currency",
        currency: "BRL"
    });

    cartCounter.innerHTML = cart.length;
}

cartItemsContainer.addEventListener("click", function(event){
     
    if(event.target.closest(".remove-from-cart-btn")){
        const name = event.target.closest(".remove-from-cart-btn").getAttribute("data-name");
        removeItemCart(name); // Remove o item do carrinho
    }

    if(event.target.closest(".increase-quantity-btn")){
        const name = event.target.closest(".increase-quantity-btn").getAttribute("data-name");
        increaseItemQuantity(name);
    }

    if(event.target.closest(".decrease-quantity-btn")){
        const name = event.target.closest(".decrease-quantity-btn").getAttribute("data-name");
        decreaseItemQuantity(name);
    }
});

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

// Função para remover o item do carrinho //
cartItemsContainer.addEventListener("click", function (event){
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name")
        removeItemCart(name);
    }
})

function removeItemCart(name) {
    // Encontrar o índice do item no carrinho
    const index = cart.findIndex(item => item.name === name);
    if (index !== -1) {
        // Remover o item do carrinho
        cart.splice(index, 1);
        updateCartModal();  // Atualiza a modal após a remoção
        mostrarToastDanger(`${name} removido do carrinho.`);

       /*  showToast('Item removido do carrinho!', 'top-right');
 */

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

