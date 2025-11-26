# 📖 Manual de Usuario
## HuertoHogar - E-commerce de Productos Orgánicos

---

**Versión:** 1.0  
**Fecha:** 2024  
**Sistema:** HuertoHogar  
**Audiencia:** Usuarios finales del sistema

---

## ÍNDICE

1. [Introducción](#1-introducción)
2. [Acceso al Sistema](#2-acceso-al-sistema)
3. [Rol: Cliente](#3-rol-cliente)
4. [Rol: Vendedor](#4-rol-vendedor)
5. [Rol: Administrador](#5-rol-administrador)
6. [Solución de Problemas](#6-solución-de-problemas)

---

## 1. INTRODUCCIÓN

### 1.1 ¿Qué es HuertoHogar?
HuertoHogar es una plataforma web de e-commerce especializada en la venta de productos orgánicos. El sistema permite a los usuarios comprar productos, gestionar inventario y administrar órdenes según su rol.

### 1.2 Navegadores Compatibles
- Google Chrome (recomendado)
- Mozilla Firefox
- Microsoft Edge
- Safari

### 1.3 Requisitos
- Conexión a Internet
- Navegador web actualizado
- JavaScript habilitado

---

## 2. ACCESO AL SISTEMA

### 2.1 Acceder a la Aplicación

**Paso 1:** Abre tu navegador web y navega a:
```
http://localhost:3000
```

**Pantalla inicial:**
```
[IMAGEN: Pantalla de inicio de HuertoHogar]
- Logo de HuertoHogar
- Menú de navegación superior
- Productos destacados
- Categorías disponibles
```

### 2.2 Registro de Usuario

**Paso 1:** Haz clic en "Registrarse" o "Login" en el menú superior.

**Pantalla de registro:**
```
[IMAGEN: Formulario de registro]
- Campo: Nombre completo
- Campo: Email
- Campo: Contraseña (mínimo 6 caracteres)
- Botón: "Registrarse"
```

**Paso 2:** Completa el formulario:
- Ingresa tu nombre completo
- Ingresa un email válido
- Crea una contraseña segura (mínimo 6 caracteres)

**Paso 3:** Haz clic en "Registrarse"

**Resultado esperado:**
- Mensaje de confirmación: "Usuario registrado exitosamente"
- Redirección automática al inicio
- Sesión iniciada automáticamente

### 2.3 Inicio de Sesión

**Paso 1:** Haz clic en "Login" en el menú superior.

**Pantalla de login:**
```
[IMAGEN: Formulario de login]
- Campo: Email
- Campo: Contraseña
- Botón: "Iniciar Sesión"
- Enlace: "¿No tienes cuenta? Regístrate"
```

**Paso 2:** Ingresa tus credenciales:
- Email: `tu-email@ejemplo.com`
- Contraseña: `tu-contraseña`

**Paso 3:** Haz clic en "Iniciar Sesión"

**Resultado esperado:**
- Redirección al inicio
- Menú actualizado con opciones según tu rol
- Mensaje de bienvenida

**Usuarios de prueba:**
- **Administrador**: `admin@huertohogar.com` / `admin123`
- **Vendedor**: `vendedor@huertohogar.com` / `vendedor123`
- **Cliente**: `cliente@huertohogar.com` / `cliente123`

---

## 3. ROL: CLIENTE

### 3.1 Navegar por Productos

**Paso 1:** En la página de inicio, verás productos destacados.

**Pantalla de productos:**
```
[IMAGEN: Lista de productos]
- Grid de productos con imágenes
- Nombre del producto
- Precio
- Botón: "Ver Detalle" o "Agregar al Carrito"
```

**Paso 2:** Haz clic en "Ver Detalle" para ver más información del producto.

**Pantalla de detalle:**
```
[IMAGEN: Detalle de producto]
- Imagen grande del producto
- Nombre
- Descripción completa
- Precio
- Categoría
- Botón: "Agregar al Carrito"
- Botón: "Volver"
```

### 3.2 Buscar por Categorías

**Paso 1:** Haz clic en "Categorías" en el menú superior.

**Pantalla de categorías:**
```
[IMAGEN: Lista de categorías]
- Verduras
- Frutas
- Lácteos
- Procesados
```

**Paso 2:** Haz clic en una categoría para ver sus productos.

### 3.3 Agregar Productos al Carrito

**Paso 1:** Navega a un producto y haz clic en "Agregar al Carrito".

**Paso 2:** Verás una confirmación: "Producto agregado al carrito".

**Paso 3:** Haz clic en el icono del carrito en el menú superior para ver tu carrito.

**Pantalla del carrito:**
```
[IMAGEN: Carrito de compras]
- Lista de productos agregados
- Cantidad de cada producto
- Precio unitario
- Precio total
- Botón: "Eliminar" (por producto)
- Botón: "Vaciar Carrito"
- Total a pagar
- Botón: "Proceder al Checkout"
```

### 3.4 Realizar una Compra (Checkout)

**Paso 1:** Desde el carrito, haz clic en "Proceder al Checkout".

**Pantalla de checkout:**
```
[IMAGEN: Formulario de checkout]
Sección: Información Personal
- Nombre
- Apellidos
- Correo electrónico

Sección: Dirección de Envío
- Calle y número
- Departamento (opcional)
- Región
- Comuna
- Indicaciones adicionales (opcional)

Sección: Resumen de Compra
- Lista de productos
- Subtotal
- Total

Botón: "Confirmar Pedido"
```

**Paso 2:** Completa todos los campos obligatorios.

**Paso 3:** Revisa el resumen de tu compra.

**Paso 4:** Haz clic en "Confirmar Pedido".

**Pantalla de confirmación:**
```
[IMAGEN: Confirmación de pedido]
- Mensaje: "¡Pedido realizado exitosamente!"
- Número de orden
- Resumen del pedido
- Botón: "Volver al Inicio"
```

---

## 4. ROL: VENDEDOR

### 4.1 Acceder al Panel de Vendedor

**Paso 1:** Inicia sesión con credenciales de vendedor.

**Paso 2:** Verás opciones adicionales en el menú:
- "Panel Vendedor"
- "Productos"
- "Órdenes"

### 4.2 Ver Productos

**Paso 1:** Haz clic en "Panel Vendedor" → "Productos".

**Pantalla de productos (Vendedor):**
```
[IMAGEN: Lista de productos para vendedor]
- Tabla con productos
- Columnas: ID, Nombre, Precio, Categoría, Imagen
- Botón: "Ver Detalle" (solo lectura)
```

**Paso 2:** Haz clic en "Ver Detalle" para ver información completa del producto.

**Funcionalidades disponibles:**
- ✅ Ver lista de productos
- ✅ Ver detalle de producto
- ❌ No puede crear, editar o eliminar productos

### 4.3 Ver Órdenes

**Paso 1:** Haz clic en "Panel Vendedor" → "Órdenes".

**Pantalla de órdenes:**
```
[IMAGEN: Lista de órdenes]
- Tabla con órdenes
- Columnas: ID, Cliente, Fecha, Total, Estado
- Botón: "Ver Detalle"
- Filtros: Por estado, por fecha
```

**Paso 2:** Haz clic en "Ver Detalle" para ver información completa de la orden.

**Pantalla de detalle de orden:**
```
[IMAGEN: Detalle de orden]
- Información del cliente
- Dirección de envío
- Lista de productos
- Total
- Estado de la orden
- Fecha de creación
```

**Funcionalidades disponibles:**
- ✅ Ver todas las órdenes
- ✅ Ver detalle de orden
- ✅ Filtrar órdenes
- ❌ No puede modificar órdenes

---

## 5. ROL: ADMINISTRADOR

### 5.1 Acceder al Panel de Administración

**Paso 1:** Inicia sesión con credenciales de administrador.

**Paso 2:** Verás el menú de administración:
- "Panel Admin"
- "Productos"
- "Categorías"
- "Órdenes"
- "Usuarios" (si está implementado)

### 5.2 Gestionar Productos

#### 5.2.1 Ver Lista de Productos

**Paso 1:** Haz clic en "Panel Admin" → "Productos".

**Pantalla de productos (Admin):**
```
[IMAGEN: Lista de productos - Admin]
- Tabla con productos
- Columnas: ID, Nombre, Precio, Categoría, Acciones
- Botones: "Ver", "Editar", "Eliminar"
- Botón: "Nuevo Producto"
```

#### 5.2.2 Crear Producto

**Paso 1:** Haz clic en "Nuevo Producto".

**Pantalla de formulario:**
```
[IMAGEN: Formulario crear producto]
- Campo: Nombre (obligatorio)
- Campo: Descripción (obligatorio)
- Campo: Precio (obligatorio, > 0)
- Campo: URL de imagen (obligatorio)
- Select: Categoría (obligatorio)
- Botón: "Guardar"
- Botón: "Cancelar"
```

**Paso 2:** Completa el formulario.

**Paso 3:** Haz clic en "Guardar".

**Resultado:** Producto creado exitosamente, redirección a la lista.

#### 5.2.3 Editar Producto

**Paso 1:** Desde la lista de productos, haz clic en "Editar" del producto deseado.

**Paso 2:** Modifica los campos necesarios.

**Paso 3:** Haz clic en "Guardar".

#### 5.2.4 Eliminar Producto

**Paso 1:** Desde la lista de productos, haz clic en "Eliminar".

**Paso 2:** Confirma la eliminación en el diálogo.

**Resultado:** Producto eliminado, mensaje de confirmación.

### 5.3 Gestionar Categorías

**Paso 1:** Haz clic en "Panel Admin" → "Categorías".

**Pantalla de categorías:**
```
[IMAGEN: Lista de categorías]
- Tabla con categorías
- Columnas: ID, Nombre, Acciones
- Botones: "Editar", "Eliminar"
- Botón: "Nueva Categoría"
```

**Operaciones disponibles:**
- Crear categoría
- Editar categoría
- Eliminar categoría

### 5.4 Ver Órdenes

**Paso 1:** Haz clic en "Panel Admin" → "Órdenes".

**Pantalla de órdenes (Admin):**
```
[IMAGEN: Lista de órdenes - Admin]
- Tabla con todas las órdenes
- Columnas: ID, Cliente, Fecha, Total, Estado
- Botón: "Ver Detalle"
- Filtros avanzados
- Exportar datos (si está implementado)
```

**Funcionalidades:**
- Ver todas las órdenes del sistema
- Ver detalle completo de cada orden
- Filtrar y buscar órdenes
- Estadísticas de ventas (si está implementado)

---

## 6. SOLUCIÓN DE PROBLEMAS

### 6.1 No puedo iniciar sesión

**Problema:** Error al iniciar sesión.

**Soluciones:**
1. Verifica que el email y contraseña sean correctos
2. Asegúrate de que el backend esté corriendo (`http://localhost:8080`)
3. Limpia la caché del navegador
4. Verifica la consola del navegador (F12) para errores

### 6.2 No se cargan los productos

**Problema:** La página de productos está vacía o muestra error.

**Soluciones:**
1. Verifica la conexión a Internet
2. Verifica que el backend esté corriendo
3. Abre la consola del navegador (F12) y revisa errores
4. Intenta recargar la página (F5)

### 6.3 Error al agregar al carrito

**Problema:** No se puede agregar productos al carrito.

**Soluciones:**
1. Verifica que estés autenticado (si es requerido)
2. Limpia el localStorage del navegador
3. Recarga la página
4. Verifica la consola para errores específicos

### 6.4 Error al realizar pedido

**Problema:** No se puede completar el checkout.

**Soluciones:**
1. Verifica que todos los campos obligatorios estén completos
2. Verifica que estés autenticado
3. Verifica que el backend esté corriendo
4. Revisa los mensajes de error en el formulario

### 6.5 No veo el panel de administración

**Problema:** No aparecen las opciones de administrador.

**Soluciones:**
1. Verifica que hayas iniciado sesión con rol ADMIN
2. Cierra sesión y vuelve a iniciar
3. Verifica que el token JWT sea válido
4. Limpia el localStorage y vuelve a iniciar sesión

---

## 7. CONTACTO Y SOPORTE

Para soporte técnico o consultas:
- Revisa la documentación técnica
- Consulta Swagger UI: `http://localhost:8080/swagger-ui.html`
- Revisa los logs del sistema

---

## 8. GLOSARIO

- **Carrito**: Lista temporal de productos seleccionados para compra
- **Checkout**: Proceso de finalización de compra
- **Orden**: Pedido confirmado de productos
- **Panel**: Área de administración según el rol del usuario
- **Rol**: Tipo de usuario (Cliente, Vendedor, Administrador)

---

**Manual de Usuario - Versión 1.0**

*Nota: Las imágenes (pantallazos) deben ser capturadas desde la aplicación en funcionamiento y agregadas a este documento.*

