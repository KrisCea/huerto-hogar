package com.huertohogar.huerto_hogar_web.repository;

import com.huertohogar.huerto_hogar_web.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}
