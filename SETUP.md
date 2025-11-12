# Scripts de Utilidad - HuertoHogar Monorepo

## 🚀 Inicio Rápido

### Opción 1: Docker Compose (Recomendado)
```bash
docker-compose up --build
```
- Frontend: http://localhost:3000
- Backend: http://localhost:8080

### Opción 2: Desarrollo Local

**Backend:**
```bash
cd backend
./mvnw spring-boot:run
```

**Frontend (en otra terminal):**
```bash
cd frontend
npm install
npm start
```

## 🧪 Tests

**Frontend:**
```bash
cd frontend
npx karma start --single-run
```

**Backend:**
```bash
cd backend
./mvnw test
```

## 🔨 Build

**Backend:**
```bash
cd backend
./mvnw clean package
```

**Frontend:**
```bash
cd frontend
npm run build
```

## 🛑 Detener Servicios

```bash
# Docker Compose
docker-compose down

# O presiona Ctrl+C en las terminales locales
```

## 📦 Limpiar

```bash
# Limpiar todo
docker-compose down -v
rm -rf backend/target
rm -rf frontend/build
rm -rf frontend/node_modules
```
