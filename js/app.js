const shopContent = document.getElementById("shopContent");
const vercarrito = document.getElementById("vercarrito");
const modalContainer = document.getElementById("modal-container");
//const showAlert = document.getElementById("showAlert");
const cantidadcarrito = document.getElementById("cantidadcarrito");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const getProducts = async()=>{
    const answer = await fetch("items.json");
    const info = await answer.json();

    info.forEach((product) => {
        let content = document.createElement("div");
        content.className = "card";
        content.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p class="price">${product.precio} $</p>
        `;
        shopContent.append(content);
        let comprar = document.createElement("button");
        comprar.innerText = "Add";
        comprar.className = "comprar";
        content.append(comprar);
        comprar.addEventListener("click", () => {
        const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);
            if (repeat) {
                carrito.map((prod) => {
                    if (prod.id === product.id) {
                        prod.cantidad++;
                    }
                });
            } else {
                carrito.push({
                    id: product.id,
                    img: product.img,
                    nombre: product.nombre,
                    precio: product.precio,
                    cantidad: product.cantidad,
                }); 
                cartCounter();
                saveInLocal();
            //  console.log(carrito);
            //  console.log(carrito.length);
            }
        });
    });
    
}
getProducts();
const saveInLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};
Swal.fire({
    title: 'Welcome Earthlings',
    text: 'Are you ready?',
    confirmButtonText: 'Yes'
    })
