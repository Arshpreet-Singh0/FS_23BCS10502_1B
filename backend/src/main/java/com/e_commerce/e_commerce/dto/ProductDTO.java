package com.e_commerce.e_commerce.dto;

import com.e_commerce.e_commerce.annotations.ProductCategoryValidation;
import com.e_commerce.e_commerce.entities.enums.Categories;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    private Long id;

    @NotBlank(message = "title of is required.")
    private String title;

    @NotBlank(message = "description is required.")
    private String description;

    @NotNull(message = "price is required.")
    private BigDecimal price;

    private BigDecimal discount;

    @NotNull(message = "quantity is required.")
    @PositiveOrZero(message = "Quantity must be positive")
    private Integer quantity;

    @NotBlank(message = "image url is required.")
    private String imageUrl;

    @NotBlank(message = "Sub Category is required.")
    @ProductCategoryValidation(enumClass = Categories.class, message = "Invalid category provided.")
    private String Category;

    @NotBlank(message = "Main Category is required.")
    @ProductCategoryValidation(enumClass = Categories.class, message = "Invalid category provided.")
    private Categories mainCategory;
}
