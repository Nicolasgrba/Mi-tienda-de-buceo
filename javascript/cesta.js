
function agregarACesta(idProducto, nombreProducto, precioProducto) {

    let cesta = JSON.parse(localStorage.getItem('cesta')) || [];

    let productoExistente = cesta.find(producto => producto.id === idProducto);

    if (productoExistente) {

        productoExistente.cantidad++;
    } else {
        cesta.push({
            id: idProducto,
            nombre: nombreProducto,
            precio: precioProducto,
            cantidad: 1
        });
    }
    localStorage.setItem('cesta', JSON.stringify(cesta));

    mostrarCesta();
}
function mostrarCesta() {
    let cesta = JSON.parse(localStorage.getItem('cesta')) || [];

    let cestaContainer = document.getElementById('cesta-container');

    cestaContainer.innerHTML = '';

    cesta.forEach(producto => {

        let nombre = producto.nombre || 'Nombre no disponible';
        let precio = isNaN(producto.precio) ? 'Precio no disponible' : producto.precio;

        let productoHTML = `
            <div>
                <p>${nombre} - Cantidad: ${producto.cantidad} - Precio: ${precio * producto.cantidad}€</p>
            </div>
        `;
        cestaContainer.innerHTML += productoHTML;
    });

    let total = cesta.reduce((suma, producto) => suma + producto.precio * producto.cantidad, 0);
    cestaContainer.innerHTML += `<p>Total: ${isNaN(total) ? 'Total no disponible' : total}€</p>`;
}
function borrarCesta() {
    localStorage.removeItem('cesta');
    
    mostrarCesta();
}
document.addEventListener('DOMContentLoaded', mostrarCesta);
