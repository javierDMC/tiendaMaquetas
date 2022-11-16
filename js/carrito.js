class Carrito {

	id;
	articulos = [];

	constructor(id) {
		this.id = id;
		this.articulos = [];
	}

	anyadeArticulo(articulo) {

		const articuloEncontrado = this.articulos.findIndex(art => art.codigo === articulo.codigo);
		//si el articuloEncontrado no existe en el carrito, devuelve -1 y pasa al else, donde lo añade
		if (articuloEncontrado >= 0) {
			this.articulos[articuloEncontrado].unidades += 1;
		} else {
			articulo.unidades = 1;
			this.articulos.push(articulo);
		}

		alert("¡Artículo añadido al carrito!");
	}

	borraArticulo(codigo) {
		let posicionBorrado = this.articulos.findIndex(art => art.codigo === codigo);

		this.articulos.splice(posicionBorrado, 1);

		//se suma 1 a la posición para saltar la fila de la cabecera
		document.getElementById("carrito").deleteRow(posicionBorrado + 1);

		if (this.articulos.length == 0) {
			const dialogo = document.getElementById("miDialogo");
			dialogo.close();
		}
	}

	modificaUnidades(codigo, operacion) {
		//recuperamos el indice del articulo que se corresponde con la fila de la tabla del dialog
		const articuloAModificar = this.articulos.findIndex(art => art.codigo === codigo);
		
		if (operacion === "sumar") {
			this.articulos[articuloAModificar].unidades += 1;
		} else if (operacion === "restar") {
			this.articulos[articuloAModificar].unidades -= 1;
		}

		//si al borrar el articulo se queda a cero unidades, borra la fila entera
		if (this.articulos[articuloAModificar].unidades == 0) {
			this.borraArticulo(codigo);
			
		} else {
			//extraigo las celdas del articulo a modificar en la tabla, ademas se suma 1 a la posición para saltar la fila de la cabecera
			const celdasArticulo = document.getElementById("carrito").rows[articuloAModificar + 1].cells;
			//accedo a la celda 4 que es la que se corresponde con la unidades de la tabla y actualizo al nuevo valor
			celdasArticulo[4].innerHTML = this.articulos[articuloAModificar].unidades;
			//accedo a la celda 5 que es la que se corresponde con el total(unidades*precio) de la tabla y actualizo al nuevo valor
			celdasArticulo[5].innerHTML = this.articulos[articuloAModificar].unidades * this.articulos[articuloAModificar].precio;
			
		}
		this.calcularPrecioTotal();

	}

	verCarrito() {
		//definición de constantes que recogen los elementos por id del dom para luego unirles la funcionalidad
		const dialogo = document.getElementById("miDialogo");
		const tablaDialogo = document.getElementById("dialogContent");
		const idPedido = document.getElementById("idPedido");//numero del pedido en el dialogo
		const seguirComprando = document.getElementById("btnCierraDialog");//boton seguir comprando

		//se abre el carrito al pulsar en el icono del carrito
		if (carrito.articulos.length > 0) {
			dialogo.showModal();
		} else {
			alert("El carrito está vacio");
		}


		//cabecera del dialogo que contiene el numero de pedido
		idPedido.innerHTML = numeroAleatorio;

		//tabla con los articulos del carrito
		let htmlLineaDialog = `<table id="carrito" class="table-bordered">\
			<tr>\
			<th></th>\
			<th>Nombre</th>\
			<th>Descripción</th>\
			<th>Precio</th>\
			<th>Unidades</th>\
			<th>Total</th>\
			<th></th>`;
		tablaDialogo.innerHTML = htmlLineaDialog;


		//foreach para pintar cada linea del dialog con un producto
		carrito.articulos.forEach(articulo => {
			htmlLineaDialog += `<tr>\
			<th><img src="assets/${articulo.codigo}.jpg" width="50" height="50"></th>\
			<th>${articulo.nombre}</th>\
			<th>${articulo.descripcion}</th>\
			<th>${articulo.precio} €</th>\
			<th>${articulo.unidades}</th>\
			<th>${articulo.precio * articulo.unidades} €</th>\
			<th><button id="sumar_${articulo.codigo}" class="btn btn-primary" onclick='carrito.modificaUnidades(${JSON.stringify(articulo.codigo)}, ${sumar})'>+</button>\
			<button id="restar_${articulo.codigo}" class="btn btn-warning" onclick='carrito.modificaUnidades(${JSON.stringify(articulo.codigo)}, ${restar})'>-</button>\
			<button id="borrar_${articulo.codigo}" class="btn btn-danger" onclick='borraArticuloEnCarrito(${JSON.stringify(articulo.codigo)})'>BORRAR</button>\
			</th>\
			</tr>`;
			tablaDialogo.innerHTML = htmlLineaDialog;
			
		});

		//cierre de la tabla en html
		//htmlLineaDialog += `</table>`;
		this.calcularPrecioTotal();

		seguirComprando.addEventListener('click', () => dialogo.close());		

	}

	calcularPrecioTotal(){
		const total = document.getElementById("total");
		let totalPrecio = 0;

		//actualiza el precio total del pedido
		this.articulos.forEach(articulo => { 
			totalPrecio += (articulo.precio * articulo.unidades); 
		});		 
		total.innerHTML = totalPrecio + " €";

	}
}
