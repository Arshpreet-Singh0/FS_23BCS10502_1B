package com.e_commerce.e_commerce.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class AddToCartDTO {

    @NotNull(message = "Quantity is required.")
    @Positive(message = "Quantity must be positive")
    private Integer quantity;

    @NotNull(message = "Product id is required.")
    private Long product_id;
}
