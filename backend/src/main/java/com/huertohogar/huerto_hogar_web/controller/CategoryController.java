package com.huertohogar.huerto_hogar_web.controller;

import com.huertohogar.huerto_hogar_web.dto.CreateCategoryDTO;
import com.huertohogar.huerto_hogar_web.exception.ResourceNotFoundException;
import com.huertohogar.huerto_hogar_web.model.Category;
import com.huertohogar.huerto_hogar_web.repository.CategoryRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    /**
     * GET /api/categories - Obtener todas las categorías
     */
    @GetMapping
    public List<Category> list() {
        return categoryRepository.findAll();
    }

    /**
     * GET /api/categories/{id} - Obtener categoría por ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Category> getById(@PathVariable Long id) {
        return categoryRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("Categoría con ID " + id + " no encontrada"));
    }

    /**
     * POST /api/categories - Crear nueva categoría
     */
    @PostMapping
    public ResponseEntity<Category> create(@Valid @RequestBody CreateCategoryDTO dto) {
        Category category = new Category();
        category.setName(dto.getName());

        Category saved = categoryRepository.save(category);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    /**
     * PUT /api/categories/{id} - Actualizar categoría
     */
    @PutMapping("/{id}")
    public ResponseEntity<Category> update(@PathVariable Long id, @Valid @RequestBody CreateCategoryDTO dto) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoría con ID " + id + " no encontrada"));

        category.setName(dto.getName());

        Category updated = categoryRepository.save(category);
        return ResponseEntity.ok(updated);
    }

    /**
     * DELETE /api/categories/{id} - Eliminar categoría
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoría con ID " + id + " no encontrada"));

        categoryRepository.delete(category);
        return ResponseEntity.noContent().build();
    }
}
