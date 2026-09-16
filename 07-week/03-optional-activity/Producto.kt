class Producto(val nombre: String, precio: Double) {

    // El precio se valida al crear el objeto: si es negativo, no se permite.
    val precio: Double = if (precio >= 0) {
        precio
    } else {
        throw IllegalArgumentException("El precio no puede ser negativo")
    }

    fun mostrar(): String {
        return "Producto: $nombre - Precio: $precio"
    }
}

fun main() {
    // Ejemplo 1: producto válido
    val manzana = Producto("Manzana", 2500.0)
    println(manzana.mostrar())

    // Ejemplo 2: producto inválido (precio negativo), manejado con null-safety
    val productoInvalido: Producto? = try {
        Producto("Producto dañado", -100.0)
    } catch (e: IllegalArgumentException) {
        println("Error al crear el producto: ${e.message}")
        null
    }

    // Llamada segura (?.) más operador elvis (?:) por si el objeto quedó en null
    println(productoInvalido?.mostrar() ?: "No se pudo crear el producto")
}
