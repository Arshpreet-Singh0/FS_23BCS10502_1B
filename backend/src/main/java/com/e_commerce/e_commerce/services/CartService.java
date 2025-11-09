package com.e_commerce.e_commerce.services;

import com.e_commerce.e_commerce.dto.AddToCartDTO;
import com.e_commerce.e_commerce.dto.CartItemDTO;
import com.e_commerce.e_commerce.entities.CartEntity;
import com.e_commerce.e_commerce.entities.ProductEntity;
import com.e_commerce.e_commerce.entities.UserEntity;
import com.e_commerce.e_commerce.exceptions.ResourceNotFoundException;
import com.e_commerce.e_commerce.repositories.CartEntityRepository;
import com.e_commerce.e_commerce.repositories.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CartService {
    private final CartEntityRepository cartEntityRepository;
    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;

    public CartItemDTO addToCart(AddToCartDTO addToCartDTO) {
        ProductEntity product = productRepository.findById(addToCartDTO.getProduct_id()).orElseThrow(
                () -> new ResourceNotFoundException("Product with id " + addToCartDTO.getProduct_id() + " not exist")
        );

        CartEntity cartItemToCreate = modelMapper.map(addToCartDTO, CartEntity.class);

        UserEntity user = (UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        cartItemToCreate.setUser(user);
        cartItemToCreate.setProduct(product);

        CartEntity savedCartItem = cartEntityRepository.save(cartItemToCreate);


        return modelMapper.map(savedCartItem, CartItemDTO.class);
    }

    public List<CartItemDTO> getCartItems() {
        UserEntity user = (UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        List<CartEntity> cartItems = cartEntityRepository.findByUserId(user.getId());

        return cartItems.stream()
                .map((cartItem) -> modelMapper.map(cartItem, CartItemDTO.class))
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteCartItem(Long cartId) {
        UserEntity user = (UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        cartEntityRepository.deleteByIdAndUserId(cartId, user.getId());

    }
}
