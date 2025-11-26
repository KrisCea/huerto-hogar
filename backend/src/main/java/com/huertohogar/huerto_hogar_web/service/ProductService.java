package com.huertohogar.huerto_hogar_web.service;

import com.huertohogar.huerto_hogar_web.dto.CreateProductDTO;
import com.huertohogar.huerto_hogar_web.exception.ResourceNotFoundException;
import com.huertohogar.huerto_hogar_web.model.Category;
import com.huertohogar.huerto_hogar_web.model.Product;
import com.huertohogar.huerto_hogar_web.repository.CategoryRepository;
import com.huertohogar.huerto_hogar_web.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public Product findById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto con ID " + id + " no encontrado"));
    }

    public Product create(CreateProductDTO dto) {
        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Categoría con ID " + dto.getCategoryId() + " no encontrada"));

        Product product = new Product();
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setImageUrl(dto.getImageUrl());
        product.setCategory(category);

        return productRepository.save(product);
    }

    public Product update(Long id, CreateProductDTO dto) {
        Product product = findById(id);
        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Categoría con ID " + dto.getCategoryId() + " no encontrada"));

        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setImageUrl(dto.getImageUrl());
        product.setCategory(category);

        return productRepository.save(product);
    }

    public void delete(Long id) {
        Product product = findById(id);
        productRepository.delete(product);
    }
}

