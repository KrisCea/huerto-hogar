package com.huertohogar.huerto_hogar_web.service;

import com.huertohogar.huerto_hogar_web.dto.CreateOrderDTO;
import com.huertohogar.huerto_hogar_web.exception.ResourceNotFoundException;
import com.huertohogar.huerto_hogar_web.model.Order;
import com.huertohogar.huerto_hogar_web.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    public Order findById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Orden con ID " + id + " no encontrada"));
    }

    public Order create(CreateOrderDTO dto) {
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
        
        if (dto.items != null) {
            try {
                order.setItemsJson(dto.items.toString());
            } catch (Exception e) {
                order.setItemsJson(null);
            }
        }

        return orderRepository.save(order);
    }
}

