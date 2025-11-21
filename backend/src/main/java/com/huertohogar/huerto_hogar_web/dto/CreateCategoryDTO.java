package com.huertohogar.huerto_hogar_web.dto;

import jakarta.validation.constraints.NotBlank;

public class CreateCategoryDTO {
    
    @NotBlank(message = "El nombre de la categoría no puede estar vacío")
    private String name;

    // Constructor vacío
    public CreateCategoryDTO() {}

    public CreateCategoryDTO(String name) {
        this.name = name;
    }

    // Getters y Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
