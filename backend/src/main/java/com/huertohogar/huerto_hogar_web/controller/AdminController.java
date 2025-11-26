package com.huertohogar.huerto_hogar_web.controller;

import com.huertohogar.huerto_hogar_web.dto.CreateProductDTO;
import com.huertohogar.huerto_hogar_web.model.Order;
import com.huertohogar.huerto_hogar_web.model.Product;
import com.huertohogar.huerto_hogar_web.service.OrderService;
import com.huertohogar.huerto_hogar_web.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@Tag(name = "Administrador", description = "API para administradores - acceso total")
@PreAuthorize("hasRole('ADMIN')")
@SecurityRequirement(name = "bearerAuth")
public class AdminController {

    private final ProductService productService;
    private final OrderService orderService;

    public AdminController(ProductService productService, OrderService orderService) {
        this.productService = productService;
        this.orderService = orderService;
    }

    // Productos - CRUD completo
    @GetMapping("/products")
    @Operation(summary = "Listar todos los productos (Admin)")
    public List<Product> listProducts() {
        return productService.findAll();
    }

    @GetMapping("/products/{id}")
    @Operation(summary = "Obtener producto por ID (Admin)")
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        return ResponseEntity.ok(productService.findById(id));
    }

    @PostMapping("/products")
    @Operation(summary = "Crear producto (Admin)")
    public ResponseEntity<Product> createProduct(@Valid @RequestBody CreateProductDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.create(dto));
    }

    @PutMapping("/products/{id}")
    @Operation(summary = "Actualizar producto (Admin)")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @Valid @RequestBody CreateProductDTO dto) {
        return ResponseEntity.ok(productService.update(id, dto));
    }

    @DeleteMapping("/products/{id}")
    @Operation(summary = "Eliminar producto (Admin)")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Órdenes - Ver todas
    @GetMapping("/orders")
    @Operation(summary = "Listar todas las órdenes (Admin)")
    public List<Order> listOrders() {
        return orderService.findAll();
    }

    @GetMapping("/orders/{id}")
    @Operation(summary = "Obtener orden por ID (Admin)")
    public ResponseEntity<Order> getOrder(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.findById(id));
    }
}

