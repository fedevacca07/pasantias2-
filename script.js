// Carrito de compras
let carrito = [];
let total = 0;

// Seleccionar botones de "Agregar al carrito"
const botonesAgregar = document.querySelectorAll('.btn-agregar');
const carritoLista = document.getElementById('carrito-lista');
const totalPrecio = document.getElementById('total-precio');
const cartCount = document.getElementById('cart-count');

// Añadir productos al carrito
botonesAgregar.forEach(boton => {
    boton.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const nombre = e.target.dataset.nombre;
        const precio = parseFloat(e.target.dataset.precio);

        const producto = { id, nombre, precio };
        carrito.push(producto);
        total += precio;

        actualizarCarrito();
    });
});

// Actualizar el carrito de compras
function actualizarCarrito() {
    carritoLista.innerHTML = '';
    carrito.forEach(producto => {
        const item = document.createElement('div');
        item.innerHTML = `${producto.nombre} - $${producto.precio} <button class="btn-quitar" data-id="${producto.id}">Quitar</button>`;
        carritoLista.appendChild(item);
    });

    totalPrecio.textContent = total.toFixed(2);
    cartCount.textContent = carrito.length;

    // Botón de quitar producto del carrito
    const botonesQuitar = document.querySelectorAll('.btn-quitar');
    botonesQuitar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            quitarProducto(id);
        });
    });
}

// Quitar producto del carrito
function quitarProducto(id) {
    const productoIndex = carrito.findIndex(producto => producto.id === id);
    if (productoIndex !== -1) {
        total -= carrito[productoIndex].precio;
        carrito.splice(productoIndex, 1);
        actualizarCarrito();
    }
}

// Finalizar compra
const finalizarCompra = document.getElementById('finalizar-compra');
finalizarCompra.addEventListener('click', () => {
    if (carrito.length === 0) {
        alert('El carrito está vacío.');
        return;
    }

    alert('Compra finalizada con éxito. ¡Gracias por su compra!');
    carrito = [];
    total = 0;
    actualizarCarrito();
});

// Filtrar productos por categoría
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const categoria = button.dataset.categoria;
        filtrarProductos(categoria);
    });
});

function filtrarProductos(categoria) {
    const productos = document.querySelectorAll('.producto');
    productos.forEach(producto => {
        if (producto.dataset.categoria === categoria || categoria === 'todos') {
            producto.style.display = 'block';
        } else {
            producto.style.display = 'none';
        }
    });
}

