# Backend Dockerfile - Spring Boot
FROM maven:3.9-eclipse-temurin-21 AS builder

WORKDIR /app

# Copiar archivos de configuración Maven
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .

# Descargar dependencias
RUN chmod +x mvnw && ./mvnw dependency:go-offline

# Copiar código fuente
COPY src src

# Compilar y empaquetar
RUN ./mvnw clean package -DskipTests

# Imagen final
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copiar JAR de la compilación
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
