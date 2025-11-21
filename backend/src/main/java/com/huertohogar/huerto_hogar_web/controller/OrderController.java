package com.huertohogar.huerto_hogar_web.controller;

import com.huertohogar.huerto_hogar_web.dto.CreateOrderDTO;
import com.huertohogar.huerto_hogar_web.model.Order;
import com.huertohogar.huerto_hogar_web.repository.OrderRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderRepository orderRepository;

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody CreateOrderDTO dto) {
        Order order = new Order();
        order.setNombre(dto.nombre);
        order.setApellidos(dto.apellidos);
        order.setCorreo(dto.correo);
        order.setCalle(dto.calle);
        order.setDepartamento(dto.departamento);
        order.setRegion(dto.region);
        order.setComuna(dto.comuna);
        order.setIndicaciones(dto.indicaciones);
        order.setTotal(dto.total != null ? dto.total : null);
        order.setCodigo(dto.codigo != null ? dto.codigo : "ORD" + System.currentTimeMillis());
        order.setEstado(dto.estado != null ? dto.estado : "confirmado");
        order.setFecha(LocalDateTime.now());
        try {
            // store items as JSON string
            if (dto.items != null) {
                order.setItemsJson(dto.items.toString());
            }
        } catch (Exception e) {
            order.setItemsJson(null);
        }

        Order saved = orderRepository.save(order);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Order> listOrders() {
        return orderRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrder(@PathVariable Long id) {
        return orderRepository.findById(id)
                .map(o -> ResponseEntity.ok(o))
                .orElse(ResponseEntity.notFound().build());
    }
}
