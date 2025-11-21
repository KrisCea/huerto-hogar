# 🚀 INICIO RÁPIDO - Backend REST CSR

> **¡Lee esto primero!** Aquí encontrarás lo que necesitas para empezar en 5 minutos.

---

## ⚡ En 30 segundos

### Backend (Terminal 1)
```bash
cd backend
java -jar target/huerto-hogar-web-0.0.1-SNAPSHOT.jar
```

### Frontend (Terminal 2)
```bash
cd frontend
npm start
```

**¡Listo!** Backend en `http://localhost:8080`, Frontend en `http://localhost:3000`

---

## 📋 Qué se Creó

✅ **Backend REST** con Spring Boot
- 3 endpoints GET funcionales
- Base de datos H2 con datos de prueba
- CORS configurado para frontend

✅ **Integración Frontend**
- Servicio de API (`apiService.js`)
- Ejemplos de componentes React
- Variables de entorno

✅ **Documentación Completa**
- 9 guías y referencias
- Ejemplos de código
- Troubleshooting

---

## 📊 3 Endpoints Disponibles

| URL | Respuesta |
|-----|----------|
| `GET /api/products` | Lista de productos |
| `GET /api/products/{id}` | Producto específico |
| `GET /api/categories` | Lista de categorías |

**Ejemplo:**
```bash
curl http://localhost:8080/api/products
```

Responde:
```json
[
  {
    "id": 1,
    "name": "Tomate",
    "price": 1.25,
    "category": {"id": 1, "name": "Verduras"}
  },
  ...
]
```

---

## 💻 Consumir desde React

```javascript
// 1. Importar
import { getProducts } from '../services/apiService';

// 2. En componente
useEffect(() => {
  getProducts()
    .then(data => console.log(data))
    .catch(err => console.error(err));
}, []);
```

**¡Es así de simple!**

---

## 📁 Estructura Clave

```
backend/
├── src/main/java/com/huertohogar/huerto_hogar_web/
│   ├── controller/       ← Endpoints REST
│   ├── model/            ← Entidades de BD
│   ├── repository/       ← Acceso a datos
│   └── config/           ← CORS

frontend/
├── src/services/
│   └── apiService.js     ← Llamadas HTTP
└── .env.development      ← Config
```

---

## ✅ Verificación en 1 Minuto

```bash
# Verificar Backend
curl http://localhost:8080/api/products

# Verificar Frontend
# Abre http://localhost:3000 en navegador
```

---

## 📚 Documentación

| Archivo | Para qué |
|---------|----------|
| **QUICK_REFERENCE.md** | Consulta rápida |
| **REST_API.md** | API detallada |
| **INTEGRACION_FRONTEND_BACKEND.md** | Cómo integrar |
| **EXTENSIONES_AVANZADAS.md** | JWT, paginación, búsqueda |
| **VERIFICACION_CHECKLIST.md** | Validar que todo funciona |

---

## 🆘 Si algo no funciona

### Backend no inicia
```bash
# ¿Compilaste?
cd backend
./mvnw clean package -DskipTests
# Luego:
java -jar target/huerto-hogar-web-0.0.1-SNAPSHOT.jar
```

### CORS error en frontend
1. Abre DevTools (F12)
2. Ve a Network
3. Verifica que requests a `/api/*` tienen status 200

### Port 8080 ocupado
```properties
# Edita application.properties:
server.port=9000
```

---

## 🎯 Próximos Pasos

1. **Ahora:**
   - [ ] Compilar backend
   - [ ] Arrancar backend
   - [ ] Arrancar frontend
   - [ ] Probar endpoints

2. **Después:**
   - [ ] Integrar con componentes React
   - [ ] Consumir API en componentes
   - [ ] Agregar funcionalidad

3. **Luego (Opcional):**
   - [ ] Autenticación JWT
   - [ ] Validación de datos
   - [ ] Paginación

---

## 🌟 Datos de Prueba Incluidos

**Categorías:**
- Verduras
- Frutas

**Productos:**
- Tomate ($1.25)
- Lechuga ($0.99)
- Manzana ($1.50)

Se cargan automáticamente al iniciar.

---

## 📞 Referencias Rápidas

### Compilar backend
```bash
cd backend
./mvnw clean package -DskipTests
```

### Ejecutar backend
```bash
java -jar target/huerto-hogar-web-0.0.1-SNAPSHOT.jar
```

### Ejecutar frontend
```bash
cd frontend
npm start
```

### Ver H2 Console
```
http://localhost:8080/h2-console
User: sa
Password: (vacío)
```

---

## ✨ Lo Más Importante

- ✅ Backend REST completamente funcional
- ✅ 3 endpoints GET listos
- ✅ Datos de prueba precargados
- ✅ CORS configurado
- ✅ Servicio JavaScript para consumir API
- ✅ Documentación completa

**¡Todo está listo para usar!**

---

## 🎓 Aprende Más

- `QUICK_REFERENCE.md` - Guía rápida (1 página)
- `DOCUMENTACION_INDICE.md` - Índice completo
- `REST_API.md` - API detallada
- `INTEGRACION_FRONTEND_BACKEND.md` - Integración paso a paso

---

## 🏁 ¡Empezar Ahora!

```bash
# Terminal 1
cd backend
java -jar target/huerto-hogar-web-0.0.1-SNAPSHOT.jar

# Terminal 2
cd frontend
npm start

# Terminal 3
curl http://localhost:8080/api/products
```

**¡Hecho!** 🎉

---

**¿Preguntas?** → Ver documentación en la carpeta raíz

Última actualización: Noviembre 11, 2025

