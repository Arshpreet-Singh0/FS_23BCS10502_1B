package com.e_commerce.e_commerce.dto;

import lombok.Data;

@Data
public class CartItemDTO {
    private Long id;
    private Integer quantity;
    private ProductDTO product;
}
