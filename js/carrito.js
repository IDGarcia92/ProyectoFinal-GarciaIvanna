const printCart = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
        <h1 class="modal-header-title">Purchase now</h1>
        `;
    modalContainer.append(modalHeader);
    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "⚙"; 
    modalbutton.className = "modal-header-button";
    modalbutton.addEventListener("click", () => {
    modalContainer.style.display = "none";
    });
    modalHeader.append(modalbutton);
    carrito.forEach((product) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
            <img src="${product.img}">
            <h3>${product.nombre}</h3>
            <p>$ ${product.precio}</p>
            <span class="decrementar">🔻</span>
            <p>${product.cantidad}</p>
            <span class="incrementar">🔺</span>
            <p>$ ${product.cantidad * product.precio}</p>
            <span class="eliminar-product"> ❌ </span>
            `;
        modalContainer.append(carritoContent);
        let decrementar = carritoContent.querySelector(".decrementar");
        decrementar.addEventListener("click", () => {
            if (product.cantidad !== 1) {
                product.cantidad--;
            }
        saveInLocal();
        printCart();
        });
        let incrementar = carritoContent.querySelector(".incrementar");
            incrementar.addEventListener("click", () => {
                product.cantidad++;
        saveInLocal();
        printCart();
        });
        let eliminar = carritoContent.querySelector(".eliminar-product");
        eliminar.addEventListener("click", () => {
            eliminarProduct(product.id);
        });
    });
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
    const totalBuying = document.createElement("button");
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `Buy for $ ${total}`;
    modalContainer.append(totalBuying); 
    totalBuying.addEventListener("click", ()=>{
        Swal.fire({
            title: 'Thanks for buying!',
            text: 'See you soon.',
            })
    })
    };
    vercarrito.addEventListener("click", printCart);
    const eliminarProduct = (id) => {
    const getId = carrito.find((element) => element.id === id);
    console.log(getId);
    carrito = carrito.filter((carritoId) => {
        return carritoId !== getId;
    });
    cartCounter();
    saveInLocal();
    printCart();
    };
    const cartCounter = () => {
    cantidadcarrito.style.display = "block";
    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
    cantidadcarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
    };
    cartCounter();