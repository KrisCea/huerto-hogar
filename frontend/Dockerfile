# Frontend Dockerfile - React
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Imagen final
FROM node:18-alpine

WORKDIR /app

# Instalar serve para servir la aplicación
RUN npm install -g serve

# Copiar build de la compilación
COPY --from=builder /app/build ./build

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
