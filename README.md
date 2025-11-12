# Monorepo - HuertoHogar (Frontend + Backend)

Este es un monorepo que contiene tanto el frontend (React) como el backend (Spring Boot) del proyecto HuertoHogar.

## 📁 Estructura del Proyecto

```
huerto-hogar/
├── backend/                  # Spring Boot REST API (Java 21)
│   ├── src/
│   ├── pom.xml
│   ├── Dockerfile
│   └── mvnw
├── frontend/                 # React Application
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── Dockerfile
│   └── karma.conf.js
├── docker-compose.yml        # Orquestación de servicios
├── .gitignore
└── README.md
```

## 🚀 Cómo Ejecutar

### Opción 1: Usando Docker Compose (Recomendado)

Requiere tener Docker y Docker Compose instalados.

```bash
# Construir y ejecutar ambos servicios
docker-compose up --build

# El frontend estará en: http://localhost:3000
# El backend estará en: http://localhost:8080
```

### Opción 2: Ejecutar Localmente (sin Docker)

#### Backend (Spring Boot)
```bash
cd backend
./mvnw spring-boot:run
# Backend disponible en: http://localhost:8080
```

#### Frontend (React)
```bash
cd frontend
npm install
npm start
# Frontend disponible en: http://localhost:3000
```

## 📋 Requisitos

### Para Docker Compose:
- Docker (versión 20.10+)
- Docker Compose (versión 1.29+)

### Para desarrollo local:
- **Backend**: Java 21, Maven 3.6+
- **Frontend**: Node.js 18+, npm 9+

## 🧪 Testing

### Frontend - Tests con Karma y Jasmine

```bash
cd frontend
npm install
npx karma start --single-run
```

### Backend - Tests con Maven

```bash
cd backend
./mvnw test
```

## 🔧 Configuración

### Frontend
- Variables de entorno: `frontend/.env`
- Puerto por defecto: `3000`
- API URL (desarrollo): `http://localhost:8080/api`

### Backend
- Configuración: `backend/src/main/resources/application.properties`
- Puerto por defecto: `8080`
- Base de datos: H2 (en memoria para desarrollo)

## 📝 Notas Importantes

- El frontend se conecta al backend a través de la URL configurada en `REACT_APP_API_URL`
- Ambos servicios están en la misma red Docker (`huerto-network`) para comunicación
- Los cambios en el código requieren reconstruir la imagen Docker o reiniciar los servicios

## 📚 Documentación Adicional

- [Backend - README](./backend/HELP.md)
- [Frontend - README](./frontend/README.md)

## 🤝 Contribución

Ambos servicios siguen estándares de código y testing. Consulta la documentación de cada carpeta para más detalles.

---

**Proyecto**: HuertoHogar - Plataforma de E-commerce para productos orgánicos
