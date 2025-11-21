package com.huertohogar.huerto_hogar_web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.DecimalMin;
import java.math.BigDecimal;

public class CreateProductDTO {
    
    @NotBlank(message = "El nombre del producto no puede estar vacío")
    private String name;
    
    @NotBlank(message = "La descripción no puede estar vacía")
    private String description;
    
    @NotNull(message = "El precio no puede estar vacío")
    @DecimalMin(value = "0.0", inclusive = false, message = "El precio debe ser mayor a 0")
    private BigDecimal price;
    
    @NotBlank(message = "La URL de imagen no puede estar vacía")
    private String imageUrl;
    
    @NotNull(message = "El ID de categoría no puede estar vacío")
    private Long categoryId;

    // Constructor vacío (requerido por JSON)
    public CreateProductDTO() {}

    // Getters y Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public Long getCategoryId() { return categoryId; }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }
}
