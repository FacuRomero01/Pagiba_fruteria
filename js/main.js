// Ejercicio 1

/* 
Creo un array de objetos con cada producto a vender.
Cada producto tiene el fomrato {id nombre, precio, imagen}
*/

const productos = [
    { id: 1, nombre: "Arandano", precio: 5000, imagen: "img/arandano.jpg" },
    { id: 2, nombre: "Banana", precio: 1000, imagen: "img/banana.jpg" },
    { id: 3, nombre: "Frambuesa", precio: 4000, imagen: "img/frambuesa.png" },
    { id: 4, nombre: "Frutilla", precio: 3000, imagen: "img/frutilla.jpg" },
    { id: 5, nombre: "Kiwi", precio: 2000, imagen: "img/kiwi.jpg" },
    { id: 6, nombre: "Mandarina", precio: 800, imagen: "img/mandarina.jpg" },
    { id: 7, nombre: "Manzana", precio: 1500, imagen: "img/manzana.jpg" },
    { id: 8, nombre: "Naranja", precio: 9000, imagen: "img/naranja.jpg" },
    { id: 9, nombre: "Pera", precio: 2500, imagen: "img/pera.jpg" },
    { id: 10, nombre: "Anana", precio: 3000, imagen: "img/anana.jpg" },
    { id: 11, nombre: "Pomelo amarillo", precio: 2000, imagen: "img/pomelo-amarillo.jpg" },
    { id: 12, nombre: "Pomelo rojo", precio: 2000, imagen: "img/pomelo-rojo.jpg" },
    { id: 13, nombre: "Sandia", precio: 1200, imagen: "img/sandia.jpg" }
];

// Ejercicio 2

// creo la función imprimirDatosAlumno

function imprimirDatosAlumno() {

    // creo el objeto alumno, el cual tienen formato {dni, nombre, apellido}
    
    const alumno = {
        dni: "45583876",
        nombre: "Facundo",
        apellido: "Romero"
    };

    // uso console.log() en combinación a los backticks (``) para mostrar por consola los datos

    console.log(`${alumno.nombre} ${alumno.apellido} - DNI: ${alumno.dni}`);

    // mediante el GetElementById() busca en el html el elemento con el id "nombreAlumno" y se lo asigno a la variable "contenedorNombre"

    const contenedorNombre = document.getElementById("nombreAlumno");

    /*si se encontró un elemento con esa id, le inyecta el nombre y apellido, si no delvolvera null
        (diferenciar entre el uso de textContent y innerHTML {texto plano/texto y HTML}) */

    if(contenedorNombre) {
        contenedorNombre.textContent= `${alumno.nombre} ${alumno.apellido}`;
    }
}

// Ejercicio 3

// creo la funcion imprimirProductos() que toma como parámetro el array de elementos hechoi en el ejercicio 1 

function imprimirProductos(productos) {

    // mediante el GetElementById() busca en el html el elemento con el id "contenedor-productos" y se lo asigno a la variable "contenedorProductos"

    const contenedorProductos = document.getElementById("contenedor-productos");
    
    //Utilizo el tipo de bucle forEach para iterar por cada producto en el array
    
        contenedorProductos.innerHTML = ""

    productos.forEach(producto => {
        
        // por cada iteracion se va a inyectar en el HTML la imagen, nombre y precio del producto

        contenedorProductos.innerHTML += `
            <div class="card-producto">
                <img src="${producto.imagen}" alt="">
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio}</p>
                <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
            </div>
        ` 
    });

}

// Ejercicio 4 

function configuracionBuscador() {
    const filtroBuscador = document.getElementById("input-busqueda");

    filtroBuscador.addEventListener("input", (evento) => {
        const textoBusqueda = evento.target.value.toLowerCase();
        const productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().startsWith(textoBusqueda));
        imprimirProductos(productosFiltrados);
    });
}

// Ejercicio 5

let carrito = JSON.parse(localStorage.getItem("carrito-productos")) || [];

function agregarAlCarrito(id) {
    const productoSeleccionado = carrito.find(producto => producto.id === id);

    if (productoSeleccionado) {
        productoSeleccionado.cantidad++;
    } else {
        const productoEnElCarrito = productos.find(producto => producto.id === id);

        carrito.push({...productoEnElCarrito, cantidad: 1});
    }

    console.log("carrito:", carrito);
    mostrarCarrito();
}

function mostrarCarrito() {
    const contenedorCarrito = document.getElementById("items-carrito");

    contenedorCarrito.innerHTML = "";

    let cantidadTotal = 0
    let PrecioTotal = 0

    carrito.forEach((producto, indice) => {

        cantidadTotal += producto.cantidad;
        PrecioTotal += (producto.precio * producto.cantidad)
        contenedorCarrito.innerHTML += `
            <li class="bloque-item">
                <p class="nombre-item">${producto.nombre} - ${producto.precio}</p>

                <div class="botones-cantidad"> 
                    <button onclick="cambiarCantidad(${indice}, -1)"> - </button>
                    <span> ${producto.cantidad}</span>
                    <button onclick="cambiarCantidad(${indice}, 1)"> + </button>
                </div>
                
                <button class="boton-eliminar" onclick="eliminarProducto(${indice})">Eliminar</button>
            </li>
        `;
    });

    document.getElementById("precio-total").textContent = `$${PrecioTotal}`;
    document.getElementById("contador-carrito").textContent = `${cantidadTotal}`;

    sincronizarStorage();
}

function eliminarProducto(indice) {
    carrito.splice(indice, 1);

    mostrarCarrito();
}

// Ejercicio 6

function sincronizarStorage() {
    localStorage.setItem("carrito-productos", JSON.stringify(carrito));
}

// Ejercicioo 7

function cambiarCantidad(indice, cambio) {
    carrito[indice].cantidad += cambio;
    
    if (carrito[indice].cantidad === 0) {
        eliminarProducto(indice);
    } else {
        mostrarCarrito();
    }
}

// Ejercicio 8 

// Ejercicio 9

function vaciarCarrito() {
carrito = []
}



function init() {
    imprimirDatosAlumno();
    imprimirProductos(productos);
    configuracionBuscador();
    mostrarCarrito();
}

init()