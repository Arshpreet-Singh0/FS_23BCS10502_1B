package com.e_commerce.e_commerce.controllers;

import com.e_commerce.e_commerce.advices.ApiError;
import com.e_commerce.e_commerce.advices.ApiResponse;
import com.e_commerce.e_commerce.dto.AddToCartDTO;
import com.e_commerce.e_commerce.dto.CartItemDTO;
import com.e_commerce.e_commerce.entities.CartEntity;
import com.e_commerce.e_commerce.services.CartService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;

    @PostMapping
    public ResponseEntity<CartItemDTO> saveCart(@Valid  @RequestBody AddToCartDTO addToCartDTO) {
        CartItemDTO cartitemDTO = cartService.addToCart(addToCartDTO);
        return new ResponseEntity<>(cartitemDTO, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<CartItemDTO>> getCart() {
        List<CartItemDTO> cartItemDTOs = cartService.getCartItems();
        return new ResponseEntity<>(cartItemDTOs, HttpStatus.OK);
    }

    @DeleteMapping(path = "/{cartId}")
    public ResponseEntity<ApiResponse<?>> deleteCartItem(@PathVariable("cartId") Long cartId) {
        cartService.deleteCartItem(cartId);
        return new ResponseEntity<>(new ApiResponse<>("item removed successfully."), HttpStatus.OK);
    }
}
