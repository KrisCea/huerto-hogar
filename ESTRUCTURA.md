# 📊 Estructura Completa del Monorepo HuertoHogar

## 🎯 Resumen Ejecutivo

Este es un **monorepo** que contiene:
- **Frontend**: React con Karma/Jasmine para testing
- **Backend**: Spring Boot REST API
- **Orquestación**: Docker Compose para ejecutar ambos servicios

---

## 📁 Estructura de Carpetas

```
huerto-hogar/                              ← RAÍZ DEL MONOREPO
│
├── 📂 backend/                            ← SPRING BOOT BACKEND
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/huertohogar/huerto_hogar_web/
│   │   │   │   └── HuertoHogarWebApplication.java    (Clase principal)
│   │   │   └── resources/
│   │   │       └── application.properties            (Configuración)
│   │   └── test/
│   │       └── java/.../HuertoHogarWebApplicationTests.java
│   ├── pom.xml                            (Dependencias Maven)
│   ├── Dockerfile                         (Imagen Docker)
│   ├── mvnw                               (Maven Wrapper)
│   └── HELP.md
│
├── 📂 frontend/                           ← REACT FRONTEND
│   ├── 📂 src/
│   │   ├── 📂 components/                 (Componentes reutilizables)
│   │   │   ├── CartItem/
│   │   │   ├── CategoryCard/
│   │   │   ├── Footer/
│   │   │   ├── Navbar/
│   │   │   └── ProductCard/
│   │   │
│   │   ├── 📂 pages/                      (Páginas/Vistas)
│   │   │   ├── Admin/
│   │   │   ├── Auth/
│   │   │   ├── Blog/
│   │   │   ├── Cart/
│   │   │   ├── Categories/
│   │   │   ├── Checkout/
│   │   │   ├── Contacto/
│   │   │   ├── Home/
│   │   │   ├── Nosotros/
│   │   │   ├── Ofertas/
│   │   │   ├── PaymentError/
│   │   │   ├── PaymentSuccess/
│   │   │   ├── ProductDetail/
│   │   │   └── Products/
│   │   │
│   │   ├── 📂 routes/
│   │   │   └── guards.jsx                 (Protección de rutas)
│   │   │
│   │   ├── 📂 context/
│   │   │   └── AuthContext.jsx            (Context API)
│   │   │
│   │   ├── 📂 data/
│   │   │   └── mockData.js                (Datos simulados)
│   │   │
│   │   ├── App.js                         (Componente principal)
│   │   ├── App.test.js                    (Tests de App)
│   │   ├── index.js                       (Punto de entrada)
│   │   └── ...otros archivos
│   │
│   ├── 📂 public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── 📂 images/
│   │       ├── products/
│   │       ├── categories/
│   │       └── blog/
│   │
│   ├── package.json                       (Dependencias npm)
│   ├── Dockerfile                         (Imagen Docker)
│   ├── karma.conf.js                      (Configuración de tests)
│   └── README.md
│
├── 📄 docker-compose.yml                  (Orquestación de servicios)
├── 📄 .gitignore                          (Archivos a ignorar en git)
├── 📄 README.md                           (Documentación principal)
├── 📄 SETUP.md                            (Guía de inicio)
└── .git/                                  (Repositorio git)

```

---

## 🔧 Tecnologías Usadas

### Backend
| Componente | Versión | Propósito |
|-----------|---------|----------|
| **Java** | 21 | Lenguaje principal |
| **Spring Boot** | 3.5.7 | Framework web |
| **Maven** | 3.6+ | Gestor de dependencias |
| **H2 Database** | - | Base de datos en memoria |
| **Spring Data JPA** | - | ORM |

### Frontend
| Componente | Versión | Propósito |
|-----------|---------|----------|
| **React** | 19.2.0 | Librería UI |
| **Node.js** | 18+ | Runtime |
| **npm** | 9+ | Gestor de paquetes |
| **React Bootstrap** | 2.10.10 | Componentes UI |
| **React Router** | 7.9.4 | Navegación SPA |
| **React Toastify** | 11.0.5 | Notificaciones |

### Testing & Build
| Tool | Propósito |
|------|----------|
| **Karma** | Test runner |
| **Jasmine** | Framework de testing |
| **React Testing Library** | Testing de componentes |
| **Webpack** | Bundler |
| **Babel** | Transpilador JS |

### Deployment
| Tool | Propósito |
|------|----------|
| **Docker** | Containerización |
| **Docker Compose** | Orquestación |

---

## 🚀 Cómo Funciona

### Modo 1: Docker Compose (Recomendado)
```bash
docker-compose up --build
```
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8080

### Modo 2: Desarrollo Local

**Backend:**
```bash
cd backend
./mvnw spring-boot:run
```
Puerto: 8080

**Frontend:**
```bash
cd frontend
npm install
npm start
```
Puerto: 3000

---

## 📋 Componentes del Frontend

### Páginas (Pages)
- **Home**: Página de inicio
- **Products**: Catálogo de productos
- **ProductDetail**: Detalle de un producto
- **Categories**: Categorías de productos
- **Ofertas**: Productos en oferta
- **Cart**: Carrito de compras
- **Checkout**: Proceso de compra
- **Auth (Login/Register)**: Autenticación
- **Admin Dashboard**: Panel administrativo
- **Blog**: Blog y artículos
- **Nosotros**: Información de la empresa
- **Contacto**: Página de contacto
- **PaymentSuccess/Error**: Estados de pago

### Componentes Reutilizables
- **Navbar**: Barra de navegación
- **Footer**: Pie de página
- **ProductCard**: Tarjeta de producto
- **CategoryCard**: Tarjeta de categoría
- **CartItem**: Item del carrito

---

## 🧪 Testing

### Frontend (Karma + Jasmine)
```bash
cd frontend
npx karma start --single-run
```

### Backend (JUnit)
```bash
cd backend
./mvnw test
```

---

## 📊 Flujo de Datos

```
┌─────────────────────────────────────────┐
│         USUARIO EN NAVEGADOR            │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│      FRONTEND (React + Router)          │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  Páginas & Componentes          │   │
│  │  - Home, Products, Cart, etc.   │   │
│  └────────────┬────────────────────┘   │
│               │                        │
│  ┌────────────▼────────────────────┐   │
│  │  Context API (Auth)             │   │
│  │  LocalStorage (Datos)           │   │
│  └────────────┬────────────────────┘   │
└────────────┬──────────────────────────┘
             │ HTTP REST API
             ▼
┌─────────────────────────────────────────┐
│     BACKEND (Spring Boot)               │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  Controllers                    │   │
│  │  - ProductController            │   │
│  │  - UserController               │   │
│  │  - OrderController              │   │
│  └────────────┬────────────────────┘   │
│               │                        │
│  ┌────────────▼────────────────────┐   │
│  │  Services (Lógica de negocio)   │   │
│  └────────────┬────────────────────┘   │
│               │                        │
│  ┌────────────▼────────────────────┐   │
│  │  Repositories (JPA)             │   │
│  └────────────┬────────────────────┘   │
│               │                        │
│  ┌────────────▼────────────────────┐   │
│  │  H2 Database                    │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

---

## 🔐 Seguridad & Performance

### Frontend
- Context API para estado global
- LocalStorage para persistencia
- Guards en rutas protegidas
- React Router para navegación SPA

### Backend
- Spring Data JPA para queries seguras
- Validaciones en controladores
- H2 Database para desarrollo

---

## 📈 Próximos Pasos de Desarrollo

### Backend
- [ ] Crear modelos (Product, Category, User, Order)
- [ ] Implementar Repositorios
- [ ] Crear Servicios de negocio
- [ ] Crear Controladores REST
- [ ] Agregar validaciones
- [ ] Implementar autenticación JWT
- [ ] Tests unitarios

### Frontend
- [ ] Completar Tests (Renderizado, Props, Estado, Eventos)
- [ ] Conectar con API del backend
- [ ] Mejorar UI/UX
- [ ] Agregar más validaciones

---

## 📞 Contacto & Soporte

**Proyecto**: HuertoHogar - E-commerce de productos orgánicos
**Ubicación del Monorepo**: `C:\Users\crisc\Desktop\Academic\REPOS\huerto-hogar`
**Git Branch**: `main`
