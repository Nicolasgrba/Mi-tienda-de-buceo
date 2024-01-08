
function ordenarProductos() {
    var orden = $('#ordenar').val();
    var productos = $('.card');

    productos.sort(function (a, b) {
        var precioA = extraerPrecio($(a).find('.card-text').last().text());
        var precioB = extraerPrecio($(b).find('.card-text').last().text());

        return (orden === 'asc') ? precioA - precioB : precioB - precioA;
    });

    $('.row').empty().append(productos);
}

function filtrarPorPrecio(min, max) {
    var productos = $('.card');

    productos.hide().filter(function () {
        var precio = extraerPrecio($(this).find('.card-text').last().text());
        return (precio >= min && precio <= max);
    }).show();
}

function limpiarFiltros() {
    var productos = $('.card');
    productos.show();
}

function extraerPrecio(texto) {
    return parseInt(texto.replace(/\D/g, ''), 10);
}

