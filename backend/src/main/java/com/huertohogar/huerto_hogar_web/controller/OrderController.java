package com.huertohogar.huerto_hogar_web.controller;

import com.huertohogar.huerto_hogar_web.dto.CreateOrderDTO;
import com.huertohogar.huerto_hogar_web.model.Order;
import com.huertohogar.huerto_hogar_web.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
@Tag(name = "Órdenes", description = "API para gestión de órdenes")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    @Operation(summary = "Crear nueva orden", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Order> createOrder(@RequestBody CreateOrderDTO dto) {
        Order created = orderService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping
    @Operation(summary = "Listar todas las órdenes", security = @SecurityRequirement(name = "bearerAuth"))
    @PreAuthorize("hasAnyRole('ADMIN', 'VENDEDOR')")
    public List<Order> listOrders() {
        return orderService.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener orden por ID", security = @SecurityRequirement(name = "bearerAuth"))
    @PreAuthorize("hasAnyRole('ADMIN', 'VENDEDOR')")
    public ResponseEntity<Order> getOrder(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.findById(id));
    }
}
