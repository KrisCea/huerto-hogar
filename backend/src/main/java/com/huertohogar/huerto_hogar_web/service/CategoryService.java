package com.huertohogar.huerto_hogar_web.service;

import com.huertohogar.huerto_hogar_web.dto.CreateCategoryDTO;
import com.huertohogar.huerto_hogar_web.exception.ResourceNotFoundException;
import com.huertohogar.huerto_hogar_web.model.Category;
import com.huertohogar.huerto_hogar_web.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    public Category findById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoría con ID " + id + " no encontrada"));
    }

    public Category create(CreateCategoryDTO dto) {
        Category category = new Category();
        category.setName(dto.getName());
        return categoryRepository.save(category);
    }

    public Category update(Long id, CreateCategoryDTO dto) {
        Category category = findById(id);
        category.setName(dto.getName());
        return categoryRepository.save(category);
    }

    public void delete(Long id) {
        Category category = findById(id);
        categoryRepository.delete(category);
    }
}

