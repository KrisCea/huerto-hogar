# 📚 Índice de Documentación - Backend REST CSR

## 🎯 Inicio Rápido

**Para empezar de inmediato, lee estos archivos en orden:**

1. **[BACKEND_REST_RESUMEN.md](./BACKEND_REST_RESUMEN.md)** ← **EMPIEZA AQUÍ**
   - Resumen ejecutivo de lo que se creó
   - Cómo ejecutar backend y frontend
   - Endpoints disponibles

2. **[INTEGRACION_FRONTEND_BACKEND.md](./INTEGRACION_FRONTEND_BACKEND.md)** ← **SEGUNDO**
   - Guía paso a paso de integración
   - Ejemplos de consumo desde React
   - Solución de problemas

3. **[backend/REST_API.md](./backend/REST_API.md)** ← **TERCERO**
   - Documentación técnica completa
   - Ejemplos con cURL
   - Estructura de datos

---

## 📖 Documentación Detallada

### Backend

| Archivo | Contenido |
|---------|-----------|
| **[backend/REST_API.md](./backend/REST_API.md)** | API REST completa: endpoints, ejemplos, datos de prueba |
| **[backend/EXTENSIONES_AVANZADAS.md](./backend/EXTENSIONES_AVANZADAS.md)** | Funcionalidades opcionales: JWT, validación, paginación, búsqueda, CRUD |

### Frontend

| Archivo | Contenido |
|---------|-----------|
| **[frontend/src/services/apiService.js](./frontend/src/services/apiService.js)** | Servicio de API con métodos para llamadas HTTP |
| **[frontend/src/components/ExamplesAPIREST.jsx](./frontend/src/components/ExamplesAPIREST.jsx)** | Componentes React de ejemplo |
| **[frontend/.env.development](./frontend/.env.development)** | Variables de entorno para desarrollo |

### Raíz del Proyecto

| Archivo | Contenido |
|---------|-----------|
| **[INTEGRACION_FRONTEND_BACKEND.md](./INTEGRACION_FRONTEND_BACKEND.md)** | Guía completa de integración |
| **[BACKEND_REST_RESUMEN.md](./BACKEND_REST_RESUMEN.md)** | Resumen ejecutivo |

---

## 🏗️ Estructura de Carpetas

```
huerto-hogar/
├── backend/
│   ├── src/main/java/com/huertohogar/huerto_hogar_web/
│   │   ├── HuertoHogarWebApplication.java      (Aplicación principal)
│   │   ├── DataLoader.java                     (Datos de prueba)
│   │   ├── config/
│   │   │   └── WebConfig.java                  (CORS)
│   │   ├── controller/
│   │   │   ├── ProductController.java
│   │   │   └── CategoryController.java
│   │   ├── model/
│   │   │   ├── Product.java
│   │   │   └── Category.java
│   │   └── repository/
│   │       ├── ProductRepository.java
│   │       └── CategoryRepository.java
│   ├── src/main/resources/
│   │   └── application.properties               (Configuración)
│   ├── pom.xml                                 (Dependencias)
│   ├── REST_API.md                             📖 Documentación API
│   └── EXTENSIONES_AVANZADAS.md                📖 Funcionalidades avanzadas
│
├── frontend/
│   ├── src/
│   │   ├── services/
│   │   │   └── apiService.js                   (Servicio HTTP)
│   │   └── components/
│   │       └── ExamplesAPIREST.jsx             (Ejemplos React)
│   ├── .env.development                        (Variables de entorno)
│   └── package.json
│
├── INTEGRACION_FRONTEND_BACKEND.md             📖 Guía integración
├── BACKEND_REST_RESUMEN.md                     📖 Resumen ejecutivo
├── DOCUMENTACION_INDICE.md                     📖 Este archivo
├── docker-compose.yml
├── README.md
└── SETUP.md
```

---

## 🚀 Guía Rápida de Comandos

### Terminal 1 - Backend
```bash
cd backend
java -jar target/huerto-hogar-web-0.0.1-SNAPSHOT.jar
# O con Maven:
./mvnw spring-boot:run
```
Backend en: `http://localhost:8080`

### Terminal 2 - Frontend
```bash
cd frontend
npm start
```
Frontend en: `http://localhost:3000`

### Terminal 3 - Pruebas
```bash
# Ver productos
curl http://localhost:8080/api/products

# Ver categorías
curl http://localhost:8080/api/categories

# Ver H2 Console
# Abre http://localhost:8080/h2-console en el navegador
```

---

## 📊 Endpoints Disponibles

### Productos
```
GET  /api/products         → Lista todos
GET  /api/products/{id}    → Obtiene uno
```

### Categorías
```
GET  /api/categories       → Lista todas
```

### Autenticación (Opcional - Ver EXTENSIONES_AVANZADAS.md)
```
POST /api/auth/register    → Registrarse
POST /api/auth/login       → Iniciar sesión
```

---

## 💡 Ejemplos de Uso

### Fetch desde React
```javascript
import { getProducts } from '../services/apiService';

useEffect(() => {
  getProducts()
    .then(data => setProducts(data))
    .catch(err => console.error(err));
}, []);
```

### cURL desde terminal
```bash
curl -X GET http://localhost:8080/api/products \
  -H "Content-Type: application/json"
```

### Axios
```javascript
import axios from 'axios';

axios.get('http://localhost:8080/api/products')
  .then(res => console.log(res.data))
  .catch(err => console.error(err));
```

---

## 🔒 Seguridad

### CORS
✅ Configurado para `http://localhost:3000`

### JWT (Opcional)
- Ver [backend/EXTENSIONES_AVANZADAS.md](./backend/EXTENSIONES_AVANZADAS.md)

---

## 🧪 Pruebas

### Verificar Backend
```bash
curl http://localhost:8080/api/products
```

### Verificar CORS
1. Abre DevTools (F12)
2. Ve a Network
3. Haz una petición desde el frontend
4. Verifica que los headers incluyan `Access-Control-Allow-Origin: http://localhost:3000`

### Verificar Base de Datos
1. Abre `http://localhost:8080/h2-console`
2. User: `sa`
3. Password: (vacío)

---

## 📚 Referencias y Links Útiles

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [Fetch API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [CORS MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [JWT.io](https://jwt.io/)
- [H2 Database](https://www.h2database.com/)

---

## ❓ Preguntas Frecuentes

**P: ¿Cómo cambio el puerto del backend?**
A: Edita `backend/src/main/resources/application.properties`:
```properties
server.port=9000
```

**P: ¿Cómo cambio el origen CORS permitido?**
A: Edita `backend/src/main/java/com/huertohogar/huerto_hogar_web/config/WebConfig.java`

**P: ¿Cómo agrego más datos de prueba?**
A: Edita `backend/src/main/java/com/huertohogar/huerto_hogar_web/DataLoader.java`

**P: ¿Cómo agrego autenticación?**
A: Ver [backend/EXTENSIONES_AVANZADAS.md](./backend/EXTENSIONES_AVANZADAS.md) - Sección 1

**P: ¿Cómo hago búsqueda y filtros?**
A: Ver [backend/EXTENSIONES_AVANZADAS.md](./backend/EXTENSIONES_AVANZADAS.md) - Sección 5

---

## 🆘 Troubleshooting

| Problema | Solución |
|----------|----------|
| `CORS error` | Verifica que CORS está configurado en `WebConfig.java` |
| `Backend no responde` | Verifica: `curl http://localhost:8080/api/products` |
| `Datos no se cargan` | Abre DevTools (F12) → Network → verifica requests |
| `Puerto en uso` | Cambia puerto en `application.properties` |

---

## ✨ Próximos Pasos

1. **Lee** [BACKEND_REST_RESUMEN.md](./BACKEND_REST_RESUMEN.md)
2. **Ejecuta** backend y frontend
3. **Prueba** los endpoints
4. **Integra** con tus componentes React
5. **Extiende** con funcionalidades de [EXTENSIONES_AVANZADAS.md](./backend/EXTENSIONES_AVANZADAS.md)

---

**¡Backend REST CSR completamente documentado!** 📚✨

Última actualización: Noviembre 11, 2025

