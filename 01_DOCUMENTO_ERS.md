# 📘 Documento ERS - Especificación de Requisitos del Sistema
## HuertoHogar - E-commerce de Productos Orgánicos

---

**Versión:** 1.0  
**Fecha:** 2024  
**Estado:** ✅ Terminado  
**Proyecto:** HuertoHogar  
**Sistema:** E-commerce de productos orgánicos

---

## 1. INTRODUCCIÓN

### 1.1 Propósito del Documento
Este documento especifica los requisitos funcionales y no funcionales del sistema HuertoHogar, una plataforma de e-commerce para la venta de productos orgánicos.

### 1.2 Alcance del Proyecto
El sistema permite a los usuarios (clientes, vendedores y administradores) gestionar productos, realizar compras y administrar órdenes a través de una aplicación web.

### 1.3 Definiciones y Acrónimos
- **ERS**: Especificación de Requisitos del Sistema
- **API**: Application Programming Interface
- **JWT**: JSON Web Token
- **REST**: Representational State Transfer
- **CRUD**: Create, Read, Update, Delete

---

## 2. DESCRIPCIÓN GENERAL

### 2.1 Perspectiva del Producto
HuertoHogar es un sistema web independiente que consta de:
- **Frontend**: Aplicación React para la interfaz de usuario
- **Backend**: API REST con Spring Boot para la lógica de negocio
- **Base de Datos**: H2 (desarrollo) / MySQL (producción)

### 2.2 Funciones del Producto
- Gestión de productos y categorías
- Sistema de autenticación y autorización por roles
- Carrito de compras
- Procesamiento de órdenes
- Panel de administración
- Panel de vendedor

### 2.3 Características del Usuario
- **Cliente**: Usuario final que compra productos
- **Vendedor**: Usuario que visualiza productos y órdenes
- **Administrador**: Usuario con acceso total al sistema

---

## 3. REQUISITOS FUNCIONALES

### 3.1 Gestión de Usuarios y Autenticación

#### RF-001: Registro de Usuario
- **Descripción**: El sistema debe permitir a los usuarios registrarse con email, contraseña y nombre.
- **Prioridad**: Alta
- **Entrada**: Email, contraseña, nombre, rol (opcional, por defecto CLIENTE)
- **Salida**: Token JWT y datos del usuario
- **Endpoint**: `POST /api/v1/auth/register`

#### RF-002: Inicio de Sesión
- **Descripción**: El sistema debe permitir a los usuarios autenticarse con email y contraseña.
- **Prioridad**: Alta
- **Entrada**: Email, contraseña
- **Salida**: Token JWT y datos del usuario
- **Endpoint**: `POST /api/v1/auth/login`

#### RF-003: Control de Acceso por Roles
- **Descripción**: El sistema debe restringir el acceso según el rol del usuario:
  - **ADMIN**: Acceso total al sistema
  - **VENDEDOR**: Ver productos y órdenes
  - **CLIENTE**: Solo acceso a la tienda
- **Prioridad**: Alta

### 3.2 Gestión de Productos

#### RF-004: Listar Productos
- **Descripción**: El sistema debe permitir listar todos los productos disponibles.
- **Prioridad**: Alta
- **Acceso**: Público
- **Endpoint**: `GET /api/v1/products`

#### RF-005: Ver Detalle de Producto
- **Descripción**: El sistema debe permitir ver los detalles de un producto específico.
- **Prioridad**: Alta
- **Acceso**: Público
- **Endpoint**: `GET /api/v1/products/{id}`

#### RF-006: Crear Producto
- **Descripción**: El sistema debe permitir a los administradores crear nuevos productos.
- **Prioridad**: Media
- **Acceso**: Solo ADMIN
- **Endpoint**: `POST /api/v1/admin/products`
- **Validaciones**: Nombre, descripción, precio > 0, imagen, categoría

#### RF-007: Actualizar Producto
- **Descripción**: El sistema debe permitir a los administradores actualizar productos existentes.
- **Prioridad**: Media
- **Acceso**: Solo ADMIN
- **Endpoint**: `PUT /api/v1/admin/products/{id}`

#### RF-008: Eliminar Producto
- **Descripción**: El sistema debe permitir a los administradores eliminar productos.
- **Prioridad**: Media
- **Acceso**: Solo ADMIN
- **Endpoint**: `DELETE /api/v1/admin/products/{id}`

### 3.3 Gestión de Categorías

#### RF-009: Listar Categorías
- **Descripción**: El sistema debe permitir listar todas las categorías de productos.
- **Prioridad**: Alta
- **Acceso**: Público
- **Endpoint**: `GET /api/v1/categories`

#### RF-010: Ver Detalle de Categoría
- **Descripción**: El sistema debe permitir ver los detalles de una categoría.
- **Prioridad**: Media
- **Acceso**: Público
- **Endpoint**: `GET /api/v1/categories/{id}`

#### RF-011: Crear Categoría
- **Descripción**: El sistema debe permitir crear nuevas categorías.
- **Prioridad**: Media
- **Acceso**: Público (puede requerir autenticación)
- **Endpoint**: `POST /api/v1/categories`

#### RF-012: Actualizar Categoría
- **Descripción**: El sistema debe permitir actualizar categorías existentes.
- **Prioridad**: Media
- **Acceso**: Público (puede requerir autenticación)
- **Endpoint**: `PUT /api/v1/categories/{id}`

#### RF-013: Eliminar Categoría
- **Descripción**: El sistema debe permitir eliminar categorías.
- **Prioridad**: Media
- **Acceso**: Público (puede requerir autenticación)
- **Endpoint**: `DELETE /api/v1/categories/{id}`

### 3.4 Gestión de Órdenes

#### RF-014: Crear Orden
- **Descripción**: El sistema debe permitir a los usuarios autenticados crear órdenes de compra.
- **Prioridad**: Alta
- **Acceso**: Usuarios autenticados
- **Endpoint**: `POST /api/v1/orders`
- **Datos requeridos**: Nombre, apellidos, correo, dirección, total

#### RF-015: Listar Órdenes (Vendedor/Admin)
- **Descripción**: El sistema debe permitir a vendedores y administradores ver todas las órdenes.
- **Prioridad**: Alta
- **Acceso**: ADMIN, VENDEDOR
- **Endpoint**: `GET /api/v1/vendedor/orders` o `GET /api/v1/admin/orders`

#### RF-016: Ver Detalle de Orden
- **Descripción**: El sistema debe permitir ver los detalles de una orden específica.
- **Prioridad**: Alta
- **Acceso**: ADMIN, VENDEDOR
- **Endpoint**: `GET /api/v1/vendedor/orders/{id}` o `GET /api/v1/admin/orders/{id}`

### 3.5 Panel de Vendedor

#### RF-017: Ver Productos (Vendedor)
- **Descripción**: El sistema debe permitir a los vendedores ver la lista de productos.
- **Prioridad**: Alta
- **Acceso**: ADMIN, VENDEDOR
- **Endpoint**: `GET /api/v1/vendedor/products`

#### RF-018: Ver Detalle de Producto (Vendedor)
- **Descripción**: El sistema debe permitir a los vendedores ver el detalle de un producto.
- **Prioridad**: Alta
- **Acceso**: ADMIN, VENDEDOR
- **Endpoint**: `GET /api/v1/vendedor/products/{id}`

### 3.6 Panel de Administrador

#### RF-019: Gestión Completa de Productos (Admin)
- **Descripción**: El sistema debe permitir a los administradores realizar todas las operaciones CRUD sobre productos.
- **Prioridad**: Alta
- **Acceso**: Solo ADMIN
- **Endpoints**: `/api/v1/admin/products/*`

#### RF-020: Visualización de Órdenes (Admin)
- **Descripción**: El sistema debe permitir a los administradores ver todas las órdenes del sistema.
- **Prioridad**: Alta
- **Acceso**: Solo ADMIN
- **Endpoint**: `GET /api/v1/admin/orders`

---

## 4. REQUISITOS NO FUNCIONALES

### 4.1 Rendimiento
- **RNF-001**: El sistema debe responder a las peticiones en menos de 2 segundos en condiciones normales.
- **RNF-002**: El sistema debe soportar al menos 100 usuarios concurrentes.

### 4.2 Seguridad
- **RNF-003**: El sistema debe usar autenticación JWT para proteger endpoints sensibles.
- **RNF-004**: Las contraseñas deben estar encriptadas usando BCrypt.
- **RNF-005**: El sistema debe validar todos los datos de entrada.
- **RNF-006**: El sistema debe implementar CORS para controlar el acceso desde el frontend.

### 4.3 Usabilidad
- **RNF-007**: La interfaz debe ser intuitiva y fácil de usar.
- **RNF-008**: El sistema debe proporcionar mensajes de error claros y en español.

### 4.4 Compatibilidad
- **RNF-009**: El frontend debe ser compatible con navegadores modernos (Chrome, Firefox, Edge, Safari).
- **RNF-010**: El backend debe funcionar en Java 21 o superior.

### 4.5 Mantenibilidad
- **RNF-011**: El código debe seguir buenas prácticas y estar documentado.
- **RNF-012**: El sistema debe usar versionado de API (`/api/v1/`).

### 4.6 Disponibilidad
- **RNF-013**: El sistema debe estar disponible 24/7 (en producción).
- **RNF-014**: El sistema debe tener manejo de errores robusto.

---

## 5. MODELO DE DATOS

### 5.1 Entidades Principales

#### Usuario (User)
- `id`: Long (PK)
- `email`: String (único, no nulo)
- `password`: String (encriptado, no nulo)
- `name`: String
- `role`: Enum (ADMIN, VENDEDOR, CLIENTE)
- `enabled`: Boolean

#### Producto (Product)
- `id`: Long (PK)
- `name`: String (no nulo)
- `description`: String (no nulo)
- `price`: BigDecimal (no nulo, > 0)
- `imageUrl`: String (no nulo)
- `category`: Category (FK, ManyToOne)

#### Categoría (Category)
- `id`: Long (PK)
- `name`: String (no nulo)

#### Orden (Order)
- `id`: Long (PK)
- `nombre`: String
- `apellidos`: String
- `correo`: String
- `calle`: String
- `departamento`: String
- `region`: String
- `comuna`: String
- `indicaciones`: String
- `total`: BigDecimal
- `codigo`: String
- `estado`: String
- `fecha`: LocalDateTime
- `itemsJson`: String (JSON)

### 5.2 Relaciones
- **Product → Category**: ManyToOne (un producto pertenece a una categoría)
- **Order → Items**: Almacenado como JSON (simplificado)

---

## 6. INTERFACES EXTERNAS

### 6.1 API REST
- **Base URL**: `http://localhost:8080/api/v1`
- **Formato**: JSON
- **Autenticación**: JWT Bearer Token
- **Documentación**: Swagger UI en `/swagger-ui.html`

### 6.2 Frontend
- **URL**: `http://localhost:3000`
- **Framework**: React 18
- **Comunicación**: Fetch API / Axios

### 6.3 Base de Datos
- **Desarrollo**: H2 In-Memory
- **Producción**: MySQL
- **ORM**: Hibernate / JPA

---

## 7. RESTRICCIONES

### 7.1 Técnicas
- El backend debe ejecutarse en Java 21+
- El frontend requiere Node.js 16+
- La base de datos debe soportar transacciones ACID

### 7.2 De Negocio
- Solo los administradores pueden modificar productos
- Solo vendedores y administradores pueden ver órdenes
- Los clientes solo pueden acceder a la tienda pública

### 7.3 Legales
- El sistema debe cumplir con protección de datos personales
- Las contraseñas deben cumplir con políticas de seguridad

---

## 8. CASOS DE USO PRINCIPALES

### CU-001: Cliente realiza compra
1. Cliente navega por productos
2. Cliente agrega productos al carrito
3. Cliente inicia sesión (si no está autenticado)
4. Cliente completa formulario de checkout
5. Sistema crea orden
6. Sistema confirma orden

### CU-002: Administrador gestiona productos
1. Administrador inicia sesión
2. Administrador accede al panel de administración
3. Administrador crea/edita/elimina productos
4. Sistema valida y guarda cambios

### CU-003: Vendedor consulta órdenes
1. Vendedor inicia sesión
2. Vendedor accede al panel de vendedor
3. Vendedor visualiza lista de órdenes
4. Vendedor consulta detalle de orden

---

## 9. GLOSARIO

- **JWT**: Token de autenticación basado en JSON
- **REST**: Arquitectura de servicios web
- **CRUD**: Operaciones básicas de base de datos (Crear, Leer, Actualizar, Eliminar)
- **DTO**: Data Transfer Object, objeto para transferencia de datos
- **ORM**: Object-Relational Mapping, mapeo objeto-relacional

---

## 10. APROBACIONES

| Rol | Nombre | Firma | Fecha |
|-----|--------|-------|-------|
| Analista | | | |
| Desarrollador | | | |
| Cliente | | | |

---

**Documento ERS - Versión 1.0 - Estado: ✅ Terminado**

