package com.huertohogar.huerto_hogar_web;

import com.huertohogar.huerto_hogar_web.model.Category;
import com.huertohogar.huerto_hogar_web.model.Product;
import com.huertohogar.huerto_hogar_web.model.User;
import com.huertohogar.huerto_hogar_web.repository.CategoryRepository;
import com.huertohogar.huerto_hogar_web.repository.ProductRepository;
import com.huertohogar.huerto_hogar_web.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Cargar categorías
        if (categoryRepository.count() == 0) {
            Category verduras = new Category("Verduras");
            Category frutas = new Category("Frutas");
            Category lacteos = new Category("Lácteos");
            
            categoryRepository.save(verduras);
            categoryRepository.save(frutas);
            categoryRepository.save(lacteos);

            // Cargar productos
            productRepository.save(new Product("Tomate", "Tomate fresco", new BigDecimal("1.25"), "/images/products/tomates.jpg", verduras));
            productRepository.save(new Product("Lechuga", "Lechuga natural", new BigDecimal("0.99"), "/images/products/lechugas.jpg", verduras));
            productRepository.save(new Product("Manzana", "Manzana roja", new BigDecimal("1.50"), "/images/products/manzanas.jpg", frutas));
        }

        // Cargar usuarios de prueba
        if (userRepository.count() == 0) {
            // Administrador
            User admin = new User();
            admin.setEmail("admin@huertohogar.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setName("Administrador");
            admin.setRole(User.Role.ADMIN);
            admin.setEnabled(true);
            userRepository.save(admin);

            // Vendedor
            User vendedor = new User();
            vendedor.setEmail("vendedor@huertohogar.com");
            vendedor.setPassword(passwordEncoder.encode("vendedor123"));
            vendedor.setName("Vendedor");
            vendedor.setRole(User.Role.VENDEDOR);
            vendedor.setEnabled(true);
            userRepository.save(vendedor);

            // Cliente
            User cliente = new User();
            cliente.setEmail("cliente@huertohogar.com");
            cliente.setPassword(passwordEncoder.encode("cliente123"));
            cliente.setName("Cliente");
            cliente.setRole(User.Role.CLIENTE);
            cliente.setEnabled(true);
            userRepository.save(cliente);
        }
    }
}
