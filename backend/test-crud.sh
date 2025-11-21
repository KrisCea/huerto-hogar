#!/bin/bash
# Script de pruebas CRUD - HuertoHogar Backend
# Ejecutar: bash test-crud.sh

API_URL="http://localhost:8080/api"
RESET='\033[0m'
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'

echo -e "${YELLOW}=== Pruebas CRUD API ===${RESET}\n"

# Test 1: GET Productos
echo -e "${YELLOW}Test 1: GET /api/products${RESET}"
curl -s "$API_URL/products" | jq '.' || echo "Error"
echo -e "\n"

# Test 2: GET Categorías
echo -e "${YELLOW}Test 2: GET /api/categories${RESET}"
curl -s "$API_URL/categories" | jq '.' || echo "Error"
echo -e "\n"

# Test 3: POST - Crear Categoría
echo -e "${YELLOW}Test 3: POST /api/categories${RESET}"
CAT_RESPONSE=$(curl -s -X POST "$API_URL/categories" \
  -H "Content-Type: application/json" \
  -d '{"name": "Lácteos"}')
CAT_ID=$(echo "$CAT_RESPONSE" | jq '.id')
echo "$CAT_RESPONSE" | jq '.'
echo -e "\n"

# Test 4: POST - Crear Producto
echo -e "${YELLOW}Test 4: POST /api/products${RESET}"
PROD_RESPONSE=$(curl -s -X POST "$API_URL/products" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"Queso\",
    \"description\": \"Queso fresco\",
    \"price\": 5.99,
    \"imageUrl\": \"/images/products/queso.jpg\",
    \"categoryId\": $CAT_ID
  }")
PROD_ID=$(echo "$PROD_RESPONSE" | jq '.id')
echo "$PROD_RESPONSE" | jq '.'
echo -e "\n"

# Test 5: GET - Obtener producto específico
echo -e "${YELLOW}Test 5: GET /api/products/{id}${RESET}"
curl -s "$API_URL/products/$PROD_ID" | jq '.'
echo -e "\n"

# Test 6: PUT - Actualizar Producto
echo -e "${YELLOW}Test 6: PUT /api/products/{id}${RESET}"
curl -s -X PUT "$API_URL/products/$PROD_ID" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"Queso Artesanal\",
    \"description\": \"Queso fresco artesanal\",
    \"price\": 7.99,
    \"imageUrl\": \"/images/products/queso-artesanal.jpg\",
    \"categoryId\": $CAT_ID
  }" | jq '.'
echo -e "\n"

# Test 7: PUT - Actualizar Categoría
echo -e "${YELLOW}Test 7: PUT /api/categories/{id}${RESET}"
curl -s -X PUT "$API_URL/categories/$CAT_ID" \
  -H "Content-Type: application/json" \
  -d '{"name": "Lácteos Premium"}' | jq '.'
echo -e "\n"

# Test 8: Error de validación (precio negativo)
echo -e "${YELLOW}Test 8: POST con validación fallida${RESET}"
curl -s -X POST "$API_URL/products" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"\",
    \"description\": \"Test\",
    \"price\": -5,
    \"imageUrl\": \"/test.jpg\",
    \"categoryId\": $CAT_ID
  }" | jq '.'
echo -e "\n"

# Test 9: Error de categoría no encontrada
echo -e "${YELLOW}Test 9: POST con categoría inexistente${RESET}"
curl -s -X POST "$API_URL/products" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"Test\",
    \"description\": \"Test\",
    \"price\": 1.99,
    \"imageUrl\": \"/test.jpg\",
    \"categoryId\": 9999
  }" | jq '.'
echo -e "\n"

# Test 10: DELETE - Eliminar producto
echo -e "${YELLOW}Test 10: DELETE /api/products/{id}${RESET}"
curl -s -X DELETE "$API_URL/products/$PROD_ID" -w "Status: %{http_code}\n"
echo -e "\n"

# Test 11: Verificar que fue eliminado
echo -e "${YELLOW}Test 11: GET producto eliminado${RESET}"
curl -s "$API_URL/products/$PROD_ID" | jq '.'
echo -e "\n"

# Test 12: DELETE - Eliminar categoría
echo -e "${YELLOW}Test 12: DELETE /api/categories/{id}${RESET}"
curl -s -X DELETE "$API_URL/categories/$CAT_ID" -w "Status: %{http_code}\n"
echo -e "\n"

echo -e "${GREEN}✅ Pruebas completadas${RESET}"
