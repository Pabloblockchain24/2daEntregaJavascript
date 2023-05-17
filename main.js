alert("-- BIENVENIDO AL CONTROL DE INVENTARIO [MODO TRABAJADOR] --")

// Creo array vacio de inventario donde se guardaran los productos
inventario=[]

// Creo funcion constructora que me ayudara a crear los objetos productos.
const Producto = function(nombre,marca,precio,stock){
    this.nombre= nombre,
    this.marca=marca,
    this.precio=precio,
    this.stock=stock
}

//creo algunos productos que van a existir en el array inventario.
let producto1 = new Producto("Poleron Tommy","Tommy hilfiger",20000,3)
let producto2 = new Producto("Chaqueta Calvin","Calvin klein",80000,10)
let producto3 = new Producto("Cortaviento The north face","The north face",45000,5)
let producto4 = new Producto("Pantalon Tommy","Tommy hilfiger",45000,5)
inventario.push(producto1)
inventario.push(producto2)
inventario.push(producto3)
inventario.push(producto4)

function agregarProducto(){
    // Pide los datos del producto por pantalla
    let nombre = prompt("Ingrese nombre del producto")
    let marca = prompt("Ingrese marca del producto")
    let precio = Number(prompt("Ingrese precio del producto"))
    let stock = Number(prompt("Ingrese cantidad de stock del producto"))

    // Valido que datos ingresados no son vacios en nombre, marca,precio y stock y que son numero en caso de precio y stock
    while (nombre == "" || marca == "" || precio == "" || stock== "" || isNaN(precio) || isNaN(stock)){
        alert("✘✘ INCORRECTO ✘✘ \n INGRESE DATOS VALIDOS")
        nombre = prompt("Ingrese nombre del producto")
        marca = prompt("Ingrese marca del producto")
        precio = Number(prompt("Ingrese precio del producto"))
        stock = Number(prompt("Ingrese cantidad de stock del producto"))
    }    
    // Creo nuevo producto usando el constructor Producto
    let producto = new Producto(nombre,marca,precio,stock)
    // Valido que el producto no este ingresado previamente al stock; IMPORTANTE: uso funcíon de orden superior some(), es true si ya pertenece al inventario
    if (inventario.some(ingreso => ingreso.nombre == producto.nombre)){
        // Si existe envío mensaje de error
        alert("NO SE PUDO INGRESAR, PRODUCTO YA EXISTE");
    }else{
        // Si no existe, uso metodo push para incorporar al array el objeto creado
        inventario.push(producto)
        // Aviso mediante alert que producto fue agregado correctamente
        alert("EL PRODUCTO " + nombre.toUpperCase() + " FUE AGREGADO CORRECTAMENTE")
    }
}

function borrarProducto(){
    // Solicito nombre de producto a borrar
    let productoABorrar = prompt("INGRESE NOMBRE DEL PRODUCTO A BORRAR").toUpperCase()
    //Verifico si existe usando la funcion find
    const encontrado = inventario.find((encontrar) => encontrar.nombre.toUpperCase() === productoABorrar)
    // Si el objeto encontrado es distinto de null, significa que existe en el inventario y se borrara; en caso contrario se emite alerta de que no existe
    if (encontrado != null){
        // Creo un nuevo inventario identico al anterior, pero dejando fuera todos los elementos que sean igual al producto que se quiere borrar
        inventario= inventario.filter(elemento => elemento.nombre.toUpperCase() !== productoABorrar)
        // Muestro un alert indicando que el producto se borro exitosamenete
        alert("PRODUCTO " + productoABorrar + " FUE BORRADO EXITOSAMENTE")
        // Muestro el nuevo inventario
        console.log("Su nuevo inventario es:")
        console.table(inventario)
    }else{ 
         alert("PRODUCTO INGRESADO NO EXISTE EN EL INVENTARIO")
    }
}

function filtrarProductos(){
    // Pido por pantalla el producto y con uppercase hago que no sea keysensitive
        let palabraAFiltrar = prompt("Ingrese producto a buscar").toUpperCase()
        // Creo variable filtrados que contendra un array devuelto por la funcion filter() en la cual se incluyen los productos con el mismo nombre  mediante la funcion includes()
        let filtrados = inventario.filter((producto) => producto.nombre.toUpperCase().includes(palabraAFiltrar))
        // Voy a verificar si el filtro encontro coincidencias, si encontro, mostrare una tabla con los resultados, si no, mostrare un alert que indique que no hay coincidencias
        if (filtrados.length>0){
            console.table(filtrados)
            alert("Busqueda exitosa; revisar en Consola")
        }else{
            alert("No hay coincidencias con su busqueda")
        }
}

// creo funcion flecha para mostrar el inventario por consola
const mostrarInventario = () => {console.table(inventario)}

// creo variable operar para el bucle while, que controlara si el usuario quiere seguir opearando o salir 
let operar=true
while (operar){
    // le pido al usuario que ingrese mediante prompt una opcion y luego valido con un while que sea valida dicha opción
    let eleccion = prompt("ESCRIBE UNA OPCION:\n\n • AGREGAR PRODUCTO \n • BORRAR PRODUCTO\n • FILTRAR PRODUCTOS [SE MUESTRA POR CONSOLA] \n • MOSTRAR INVENTARIO [SE MUESTRA POR CONSOLA] \n • SALIR --> PRESIONA CANCELAR \n")
    while ((eleccion.toUpperCase() !== "AGREGAR PRODUCTO") &&  (eleccion.toUpperCase() !== "BORRAR PRODUCTO") &&  (eleccion.toUpperCase() !== "FILTRAR PRODUCTOS") && (eleccion.toUpperCase() !=="MOSTRAR INVENTARIO")){
    eleccion = prompt("✘✘ INCORRECTO ✘✘\n\nESCRIBE UNA OPCION:\n\n • AGREGAR PRODUCTO \n  • BORRAR PRODUCTO \n • FILTRAR PRODUCTOS [SE MUESTRA POR CONSOLA] \n • MOSTRAR INVENTARIO [SE MUESTRA POR CONSOLA] \n • SALIR --> PRESIONA CANCELAR \n")
    }

    // con la eleccion hecha por el usuario, busco a cual caso corresponde y ejecuto la funcion que corresponda
     switch(eleccion.toUpperCase()){
        case "AGREGAR PRODUCTO":
            agregarProducto()
            break
        case "BORRAR PRODUCTO":
            borrarProducto()
            break
        case "FILTRAR PRODUCTOS":
            filtrarProductos()
            break
        case "MOSTRAR INVENTARIO":
            mostrarInventario()
            break
    }
// le pregunto al usuario si quiere seguir operando o desea salir.
operar = confirm("¿Quieres seguir operando? Aceptar(Si) || Cancelar(No)")
}
