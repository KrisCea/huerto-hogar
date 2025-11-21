package com.huertohogar.huerto_hogar_web.repository;

import com.huertohogar.huerto_hogar_web.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
}
