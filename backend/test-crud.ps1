# Script de pruebas CRUD - HuertoHogar Backend (PowerShell)
# Ejecutar: .\test-crud.ps1

$API_URL = "http://localhost:8080/api"
$GREEN = "`e[32m"
$RED = "`e[31m"
$YELLOW = "`e[33m"
$RESET = "`e[0m"

Write-Host "${YELLOW}=== Pruebas CRUD API ===${RESET}`n"

# Test 1: GET Productos
Write-Host "${YELLOW}Test 1: GET /api/products${RESET}"
try {
    $response = Invoke-WebRequest -Uri "$API_URL/products" -Method GET -ErrorAction Stop
    $response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 3
} catch {
    Write-Host "$RED Error: $_$RESET"
}
Write-Host "`n"

# Test 2: GET Categorías
Write-Host "${YELLOW}Test 2: GET /api/categories${RESET}"
try {
    $response = Invoke-WebRequest -Uri "$API_URL/categories" -Method GET -ErrorAction Stop
    $response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 3
} catch {
    Write-Host "$RED Error: $_$RESET"
}
Write-Host "`n"

# Test 3: POST - Crear Categoría
Write-Host "${YELLOW}Test 3: POST /api/categories${RESET}"
try {
    $body = @{ name = "Lácteos" } | ConvertTo-Json
    $catResponse = Invoke-WebRequest -Uri "$API_URL/categories" -Method POST `
        -Headers @{"Content-Type"="application/json"} `
        -Body $body -ErrorAction Stop
    $catData = $catResponse.Content | ConvertFrom-Json
    $CAT_ID = $catData.id
    $catData | ConvertTo-Json -Depth 3
    Write-Host "Categoría creada con ID: $CAT_ID"
} catch {
    Write-Host "$RED Error: $_$RESET"
}
Write-Host "`n"

# Test 4: POST - Crear Producto
Write-Host "${YELLOW}Test 4: POST /api/products${RESET}"
try {
    $prodBody = @{
        name = "Queso"
        description = "Queso fresco"
        price = 5.99
        imageUrl = "/images/products/queso.jpg"
        categoryId = $CAT_ID
    } | ConvertTo-Json
    
    $prodResponse = Invoke-WebRequest -Uri "$API_URL/products" -Method POST `
        -Headers @{"Content-Type"="application/json"} `
        -Body $prodBody -ErrorAction Stop
    $prodData = $prodResponse.Content | ConvertFrom-Json
    $PROD_ID = $prodData.id
    $prodData | ConvertTo-Json -Depth 3
    Write-Host "Producto creado con ID: $PROD_ID"
} catch {
    Write-Host "$RED Error: $_$RESET"
}
Write-Host "`n"

# Test 5: GET - Obtener producto específico
Write-Host "${YELLOW}Test 5: GET /api/products/{id}${RESET}"
try {
    $response = Invoke-WebRequest -Uri "$API_URL/products/$PROD_ID" -Method GET -ErrorAction Stop
    $response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 3
} catch {
    Write-Host "$RED Error: $_$RESET"
}
Write-Host "`n"

# Test 6: PUT - Actualizar Producto
Write-Host "${YELLOW}Test 6: PUT /api/products/{id}${RESET}"
try {
    $updateBody = @{
        name = "Queso Artesanal"
        description = "Queso fresco artesanal"
        price = 7.99
        imageUrl = "/images/products/queso-artesanal.jpg"
        categoryId = $CAT_ID
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest -Uri "$API_URL/products/$PROD_ID" -Method PUT `
        -Headers @{"Content-Type"="application/json"} `
        -Body $updateBody -ErrorAction Stop
    $response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 3
} catch {
    Write-Host "$RED Error: $_$RESET"
}
Write-Host "`n"

# Test 7: Error de validación
Write-Host "${YELLOW}Test 7: POST con validación fallida${RESET}"
try {
    $invalidBody = @{
        name = ""
        description = "Test"
        price = -5
        imageUrl = "/test.jpg"
        categoryId = $CAT_ID
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest -Uri "$API_URL/products" -Method POST `
        -Headers @{"Content-Type"="application/json"} `
        -Body $invalidBody -ErrorAction Stop
} catch {
    $errorResponse = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($errorResponse)
    $errorContent = $reader.ReadToEnd()
    $reader.Dispose()
    Write-Host "Error capturado (esperado):"
    $errorContent | ConvertFrom-Json | ConvertTo-Json -Depth 3
}
Write-Host "`n"

# Test 8: DELETE - Eliminar producto
Write-Host "${YELLOW}Test 8: DELETE /api/products/{id}${RESET}"
try {
    $response = Invoke-WebRequest -Uri "$API_URL/products/$PROD_ID" -Method DELETE -ErrorAction Stop
    Write-Host "Status: $($response.StatusCode)"
    Write-Host "${GREEN}Producto eliminado exitosamente${RESET}"
} catch {
    Write-Host "$RED Error: $_$RESET"
}
Write-Host "`n"

# Test 9: Verificar que fue eliminado
Write-Host "${YELLOW}Test 9: GET producto eliminado${RESET}"
try {
    $response = Invoke-WebRequest -Uri "$API_URL/products/$PROD_ID" -Method GET -ErrorAction Stop
} catch {
    $errorResponse = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($errorResponse)
    $errorContent = $reader.ReadToEnd()
    $reader.Dispose()
    Write-Host "Error capturado (esperado - 404):"
    $errorContent | ConvertFrom-Json | ConvertTo-Json -Depth 3
}
Write-Host "`n"

Write-Host "${GREEN}✅ Pruebas completadas${RESET}"
