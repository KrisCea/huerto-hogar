package com.huertohogar.huerto_hogar_web.controller;

import com.huertohogar.huerto_hogar_web.model.Order;
import com.huertohogar.huerto_hogar_web.model.Product;
import com.huertohogar.huerto_hogar_web.service.OrderService;
import com.huertohogar.huerto_hogar_web.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/vendedor")
@Tag(name = "Vendedor", description = "API para vendedores - ver productos y órdenes")
@PreAuthorize("hasAnyRole('ADMIN', 'VENDEDOR')")
@SecurityRequirement(name = "bearerAuth")
public class VendedorController {

    private final ProductService productService;
    private final OrderService orderService;

    public VendedorController(ProductService productService, OrderService orderService) {
        this.productService = productService;
        this.orderService = orderService;
    }

    @GetMapping("/products")
    @Operation(summary = "Listar todos los productos (Vendedor)")
    public List<Product> listProducts() {
        return productService.findAll();
    }

    @GetMapping("/products/{id}")
    @Operation(summary = "Ver detalle de producto (Vendedor)")
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        return ResponseEntity.ok(productService.findById(id));
    }

    @GetMapping("/orders")
    @Operation(summary = "Listar todas las órdenes (Vendedor)")
    public List<Order> listOrders() {
        return orderService.findAll();
    }

    @GetMapping("/orders/{id}")
    @Operation(summary = "Ver detalle de orden (Vendedor)")
    public ResponseEntity<Order> getOrder(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.findById(id));
    }
}

