package com.huertohogar.huerto_hogar_web.controller;

import com.huertohogar.huerto_hogar_web.dto.CreateCategoryDTO;
import com.huertohogar.huerto_hogar_web.model.Category;
import com.huertohogar.huerto_hogar_web.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/categories")
@Tag(name = "Categorías", description = "API para gestión de categorías")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    @Operation(summary = "Listar todas las categorías")
    public List<Category> list() {
        return categoryService.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener categoría por ID")
    public ResponseEntity<Category> getById(@PathVariable Long id) {
        return ResponseEntity.ok(categoryService.findById(id));
    }

    @PostMapping
    @Operation(summary = "Crear nueva categoría")
    public ResponseEntity<Category> create(@Valid @RequestBody CreateCategoryDTO dto) {
        Category created = categoryService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar categoría")
    public ResponseEntity<Category> update(@PathVariable Long id, @Valid @RequestBody CreateCategoryDTO dto) {
        return ResponseEntity.ok(categoryService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar categoría")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        categoryService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
