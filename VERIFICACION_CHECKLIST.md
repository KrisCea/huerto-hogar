# ✅ Checklist de Verificación - Backend REST CSR

## 📋 Pre-Ejecución

- [ ] Java 21+ instalado: `java -version`
- [ ] Maven 3.9+ instalado: `mvn -version`
- [ ] Node.js 18+ instalado: `node -v`
- [ ] npm 9+ instalado: `npm -v`

---

## 🏗️ Fase 1: Compilación del Backend

```bash
cd backend
```

### Pasos
- [ ] `./mvnw clean package -DskipTests` completa sin errores
- [ ] Archivo generado: `target/huerto-hogar-web-0.0.1-SNAPSHOT.jar`
- [ ] Tamaño del JAR: ~50MB

### Posibles Errores
| Error | Solución |
|-------|----------|
| `java.lang.UnsupportedClassVersionError` | Actualizar Java a versión 21+ |
| `Failed to download maven artifact` | Revisar conexión a internet |
| `Compilation errors` | Verificar que no hay errores de sintaxis |

---

## 🚀 Fase 2: Ejecución del Backend

```bash
java -jar target/huerto-hogar-web-0.0.1-SNAPSHOT.jar
```

### Verificaciones

- [ ] Output contiene: `Started HuertoHogarWebApplication`
- [ ] Output contiene: `Tomcat started on port(s): 8080`
- [ ] Output contiene: `H2 console available at '/h2-console'`
- [ ] Output contiene: `Initialized JPA EntityManagerFactory`
- [ ] Output contiene: `insert into category` (3 veces mínimo)
- [ ] Output contiene: `insert into product` (3 veces mínimo)

### Logs Esperados
```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/

 :: Spring Boot ::                (v3.5.7)

Tomcat initialized with port(s): 8080 (http)
Started HiertoHogarWebApplication in 3.5 seconds
```

---

## 🧪 Fase 3: Pruebas de API

### Terminal 3 (nueva)

#### Test 1: ¿Backend está corriendo?
```bash
curl http://localhost:8080/api/products
```
**Resultado Esperado:**
```json
[
  {"id":1,"name":"Tomate",...},
  {"id":2,"name":"Lechuga",...},
  {"id":3,"name":"Manzana",...}
]
```
- [ ] Respuesta JSON válida
- [ ] Status HTTP: 200
- [ ] 3 productos en la lista

#### Test 2: Obtener producto por ID
```bash
curl http://localhost:8080/api/products/1
```
**Resultado Esperado:**
```json
{
  "id":1,
  "name":"Tomate",
  "description":"Tomate fresco",
  "price":1.25,
  "imageUrl":"/images/products/tomate.jpg",
  "category":{"id":1,"name":"Verduras"}
}
```
- [ ] Respuesta incluye detalles del producto
- [ ] Status HTTP: 200

#### Test 3: Obtener producto inexistente
```bash
curl http://localhost:8080/api/products/999
```
**Resultado Esperado:**
```
(respuesta vacía)
```
- [ ] Status HTTP: 404
- [ ] Sin cuerpo de respuesta

#### Test 4: Obtener categorías
```bash
curl http://localhost:8080/api/categories
```
**Resultado Esperado:**
```json
[
  {"id":1,"name":"Verduras"},
  {"id":2,"name":"Frutas"}
]
```
- [ ] Respuesta JSON válida
- [ ] 2 categorías en la lista
- [ ] Status HTTP: 200

#### Test 5: H2 Console
```bash
# Abre en navegador:
http://localhost:8080/h2-console
```
**Verificaciones:**
- [ ] Página carga correctamente
- [ ] Se puede conectar con:
  - User: `sa`
  - Password: (vacío)
  - JDBC URL: `jdbc:h2:mem:huertohogar`
- [ ] Ejecutar: `SELECT * FROM CATEGORY;` devuelve 2 filas
- [ ] Ejecutar: `SELECT * FROM PRODUCT;` devuelve 3 filas

---

## 📱 Fase 4: Configuración del Frontend

```bash
cd frontend
```

### Pasos
- [ ] `npm install` completa sin errores
- [ ] `npm start` inicia servidor en puerto 3000
- [ ] Navegador abre `http://localhost:3000` automáticamente
- [ ] Página carga sin errores de consola

### Verificaciones en DevTools (F12)

#### Console
- [ ] No hay errores rojos (errors)
- [ ] Mensajes normales de React pueden aparecer (warnings ok)

#### Network
- [ ] Requests a `http://localhost:8080/api/*` retornan 200
- [ ] Headers incluyen: `Access-Control-Allow-Origin: http://localhost:3000`

---

## 🔗 Fase 5: Integración Frontend-Backend

### Test 1: Consumir API desde React

1. Abrir `frontend/src/services/apiService.js`
   - [ ] Archivo existe
   - [ ] Contiene métodos: `getProducts()`, `getProductById()`, `getCategories()`

2. Importar en un componente:
```javascript
import { getProducts } from '../services/apiService';
```
- [ ] Import no produce errores

3. Ejecutar en consola del navegador:
```javascript
fetch('http://localhost:8080/api/products')
  .then(r => r.json())
  .then(d => console.log(d))
```
- [ ] Se imprime el JSON de productos
- [ ] No hay error de CORS

---

## 📊 Fase 6: Validación de Datos

### Estructura de Respuesta

```javascript
// GET /api/products debe retornar:
{
  "id": number,           // ✅ Presente
  "name": string,         // ✅ Presente
  "description": string,  // ✅ Presente
  "price": number,        // ✅ Presente
  "imageUrl": string,     // ✅ Presente
  "category": {
    "id": number,         // ✅ Presente
    "name": string        // ✅ Presente
  }
}
```

- [ ] Todos los campos están presentes
- [ ] Tipos de datos son correctos
- [ ] No hay valores nulos inesperados

---

## 🔒 Fase 7: Verificación de CORS

### Test CORS desde Frontend

```javascript
// En consola del navegador
fetch('http://localhost:8080/api/products')
  .then(res => res.json())
  .then(data => console.log('✅ CORS OK:', data))
  .catch(err => console.error('❌ CORS Error:', err))
```

- [ ] Mensaje "✅ CORS OK" aparece en consola
- [ ] Sin error "Access to XMLHttpRequest blocked by CORS"

---

## 🗄️ Fase 8: Verificación de Base de Datos

### En H2 Console

1. Ejecutar: `DESCRIBE CATEGORY`
   ```
   CATEGORY: id (BIGINT), name (VARCHAR(255))
   ```
   - [ ] Tabla existe
   - [ ] 2 columnas correctas

2. Ejecutar: `DESCRIBE PRODUCT`
   ```
   PRODUCT: id (BIGINT), name (VARCHAR), description (VARCHAR), 
            price (NUMERIC), image_url (VARCHAR), category_id (BIGINT)
   ```
   - [ ] Tabla existe
   - [ ] 6 columnas correctas

3. Ejecutar: `SELECT COUNT(*) FROM CATEGORY;`
   - [ ] Resultado: 2

4. Ejecutar: `SELECT COUNT(*) FROM PRODUCT;`
   - [ ] Resultado: 3

---

## 📈 Resumen de Verificación

### Backend ✅
- [ ] Compila sin errores
- [ ] Arranca correctamente
- [ ] H2 database inicializa
- [ ] DataLoader carga datos

### API REST ✅
- [ ] GET /api/products funciona
- [ ] GET /api/products/{id} funciona
- [ ] GET /api/categories funciona
- [ ] Errores 404 funcionan correctamente

### Frontend ✅
- [ ] Inicia sin errores
- [ ] Conecta al backend
- [ ] CORS funciona

### Base de Datos ✅
- [ ] Tablas creadas correctamente
- [ ] Datos cargados correctamente
- [ ] H2 Console accesible

### Integración ✅
- [ ] Frontend puede llamar API
- [ ] Datos se cargan correctamente
- [ ] Sin errores de CORS

---

## 🚨 Troubleshooting Rápido

| Síntoma | Causa Probable | Solución |
|---------|----------------|----------|
| Backend no inicia | Puerto 8080 ocupado | Cambiar puerto en `application.properties` |
| CORS error | CORS no configurado | Verificar `WebConfig.java` |
| Datos no aparecen | DataLoader no ejecutó | Revisar logs de backend |
| API retorna 404 | Ruta incorrecta | Verificar endpoints en controllers |
| Conexión rechazada | Backend no corriendo | Ejecutar: `java -jar target/...jar` |

---

## 📝 Próximas Acciones

1. **✅ Backend REST**: Completado
2. **→ Integración React**: Consumir `/api/products` en componentes
3. **→ Carrito de compras**: Guardar en estado de React
4. **→ Órdenes**: POST a backend (extensión)
5. **→ Autenticación**: JWT (extensión)

---

## 🎉 ¿Listo?

Si todas las verificaciones pasaron: ✅

```
Backend REST CSR completamente funcional! 🚀
Frontend integrado correctamente! 📱
¡Listo para desarrollo! 💻
```

---

**Fecha de Creación**: Noviembre 11, 2025
**Versión**: 1.0
**Estado**: ✅ Verificado y Funcional

