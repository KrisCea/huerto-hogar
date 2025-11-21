#!/usr/bin/env python3
"""
Health Check Script for Huerto Hogar CRUD System
Verifica que todos los componentes estén correctamente configurados
"""

import requests
import json
import sys
from pathlib import Path

class HealthChecker:
    def __init__(self):
        self.backend_url = "http://localhost:8080/api"
        self.results = []
        
    def check(self, name, condition, details=""):
        """Registrar resultado de un chequeo"""
        status = "✅ PASS" if condition else "❌ FAIL"
        self.results.append({
            'name': name,
            'status': status,
            'condition': condition,
            'details': details
        })
        print(f"{status}: {name}")
        if details:
            print(f"       {details}")
    
    def run_all(self):
        """Ejecutar todos los chequeos"""
        print("\n" + "="*60)
        print("🏥 HEALTH CHECK - Huerto Hogar CRUD System")
        print("="*60 + "\n")
        
        # 1. Backend Connectivity
        print("📡 Backend Connectivity")
        print("-" * 40)
        self.check_backend()
        
        # 2. Database
        print("\n💾 Database")
        print("-" * 40)
        self.check_database()
        
        # 3. API Endpoints
        print("\n🔌 API Endpoints")
        print("-" * 40)
        self.check_endpoints()
        
        # 4. Data Integrity
        print("\n📊 Data Integrity")
        print("-" * 40)
        self.check_data_integrity()
        
        # 5. Frontend Assets
        print("\n🎨 Frontend Assets")
        print("-" * 40)
        self.check_frontend()
        
        # Summary
        print("\n" + "="*60)
        print("RESUMEN")
        print("="*60)
        self.print_summary()
        
    def check_backend(self):
        """Verificar conectividad del backend"""
        try:
            response = requests.get(f"{self.backend_url}/products", timeout=5)
            self.check(
                "Backend API conectado",
                response.status_code == 200,
                f"Status: {response.status_code}"
            )
        except requests.exceptions.ConnectionError:
            self.check(
                "Backend API conectado",
                False,
                "No se puede conectar a http://localhost:8080"
            )
        except Exception as e:
            self.check("Backend API conectado", False, str(e))
    
    def check_database(self):
        """Verificar base de datos"""
        try:
            response = requests.get(
                f"{self.backend_url}/categories",
                timeout=5
            )
            if response.status_code == 200:
                categories = response.json()
                self.check(
                    "Base de datos accesible",
                    True,
                    f"Encontradas {len(categories)} categorías"
                )
            else:
                self.check(
                    "Base de datos accesible",
                    False,
                    f"Status: {response.status_code}"
                )
        except Exception as e:
            self.check("Base de datos accesible", False, str(e))
    
    def check_endpoints(self):
        """Verificar endpoints CRUD"""
        endpoints = [
            ("GET /products", "GET", f"{self.backend_url}/products", 200),
            ("GET /categories", "GET", f"{self.backend_url}/categories", 200),
        ]
        
        for name, method, url, expected_status in endpoints:
            try:
                if method == "GET":
                    response = requests.get(url, timeout=5)
                self.check(
                    name,
                    response.status_code == expected_status,
                    f"Status: {response.status_code}"
                )
            except Exception as e:
                self.check(name, False, str(e))
    
    def check_data_integrity(self):
        """Verificar integridad de datos"""
        try:
            # Obtener productos
            products_resp = requests.get(
                f"{self.backend_url}/products",
                timeout=5
            )
            products = products_resp.json() if products_resp.ok else []
            
            # Obtener categorías
            cats_resp = requests.get(
                f"{self.backend_url}/categories",
                timeout=5
            )
            categories = cats_resp.json() if cats_resp.ok else []
            
            self.check(
                "Datos iniciales cargados",
                len(products) > 0,
                f"{len(products)} productos, {len(categories)} categorías"
            )
            
            # Verificar que productos tienen categorías
            if products:
                has_categories = all(
                    'category' in p and p['category'] is not None 
                    for p in products
                )
                self.check(
                    "Productos tienen categorías asignadas",
                    has_categories,
                    "Todas las relaciones intactas"
                )
            
        except Exception as e:
            self.check("Datos iniciales cargados", False, str(e))
    
    def check_frontend(self):
        """Verificar que archivos del frontend existan"""
        frontend_path = Path("frontend/src/components/CRUDExamples.jsx")
        admin_path = Path("frontend/src/pages/Admin/AdminDashboard.jsx")
        service_path = Path("frontend/src/services/apiService.js")
        
        self.check(
            "CRUDExamples.jsx existe",
            frontend_path.exists(),
            str(frontend_path)
        )
        self.check(
            "AdminDashboard.jsx existe",
            admin_path.exists(),
            str(admin_path)
        )
        self.check(
            "apiService.js existe",
            service_path.exists(),
            str(service_path)
        )
    
    def print_summary(self):
        """Imprimir resumen de resultados"""
        passed = sum(1 for r in self.results if r['condition'])
        total = len(self.results)
        percentage = (passed / total * 100) if total > 0 else 0
        
        print(f"\n✅ Passed: {passed}/{total} ({percentage:.0f}%)\n")
        
        if passed == total:
            print("🎉 ¡Todo está funcionando correctamente!")
            print("\nPróximos pasos:")
            print("  1. Iniciar el backend: mvnw spring-boot:run")
            print("  2. Iniciar el frontend: npm start")
            print("  3. Abrir: http://localhost:3000")
            print("  4. Ir a Admin Dashboard para gestionar CRUD")
            return True
        else:
            print("⚠️  Hay problemas que resolver:")
            for result in self.results:
                if not result['condition']:
                    print(f"  • {result['name']}")
                    if result['details']:
                        print(f"    → {result['details']}")
            return False
    
    def test_crud_operations(self):
        """Test CRUD operations (opcional)"""
        print("\n" + "="*60)
        print("🧪 PRUEBAS CRUD (Opcional)")
        print("="*60 + "\n")
        
        try:
            # GET all
            print("Testing GET /products...")
            resp = requests.get(f"{self.backend_url}/products")
            print(f"  ✅ GET returned {len(resp.json())} products")
            
            # GET by ID
            if resp.json():
                first_id = resp.json()[0]['id']
                print(f"\nTesting GET /products/{first_id}...")
                resp = requests.get(f"{self.backend_url}/products/{first_id}")
                print(f"  ✅ GET by ID returned: {resp.json()['name']}")
            
            # POST
            print("\nTesting POST /products...")
            new_product = {
                "name": "Test Product",
                "description": "Test Description",
                "price": 9.99,
                "imageUrl": "https://test.com/image.jpg",
                "categoryId": 1
            }
            resp = requests.post(
                f"{self.backend_url}/products",
                json=new_product,
                headers={"Content-Type": "application/json"}
            )
            if resp.status_code == 201:
                print(f"  ✅ POST returned {resp.status_code}")
                created_id = resp.json()['id']
            else:
                print(f"  ❌ POST returned {resp.status_code}: {resp.text}")
                return
            
            # PUT
            if 'created_id' in locals():
                print(f"\nTesting PUT /products/{created_id}...")
                resp = requests.put(
                    f"{self.backend_url}/products/{created_id}",
                    json={**new_product, "name": "Updated Test"},
                    headers={"Content-Type": "application/json"}
                )
                print(f"  ✅ PUT returned {resp.status_code}")
                
                # DELETE
                print(f"\nTesting DELETE /products/{created_id}...")
                resp = requests.delete(f"{self.backend_url}/products/{created_id}")
                print(f"  ✅ DELETE returned {resp.status_code}")
            
            print("\n✅ CRUD operations working correctly!\n")
            
        except Exception as e:
            print(f"\n❌ Error during CRUD tests: {e}\n")

def main():
    checker = HealthChecker()
    
    # Ejecutar chequeos básicos
    success = checker.run_all()
    
    # Preguntar si ejecutar tests CRUD
    if success:
        try:
            run_tests = input("\n¿Ejecutar pruebas CRUD? (s/n): ").lower()
            if run_tests == 's':
                checker.test_crud_operations()
        except (KeyboardInterrupt, EOFError):
            pass
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())
