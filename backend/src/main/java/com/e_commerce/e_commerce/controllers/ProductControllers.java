package com.e_commerce.e_commerce.controllers;

import com.e_commerce.e_commerce.dto.ProductDTO;
import com.e_commerce.e_commerce.services.ProductService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductControllers {
    private final ProductService productService;

    private final Integer PAGE_SIZE = 10;

    public ProductControllers(ProductService productService) {
        this.productService = productService;
    }


    @GetMapping(path = "{productId}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable(name = "productId") Long id) {
        return ResponseEntity.ok(productService.findById(id));
    }


    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "id") String sortBy){
        Pageable requestedPage = PageRequest.of(page, 10, Sort.by(Sort.Direction.ASC, sortBy, "price"));

        List<ProductDTO> productDTOs =  productService.findAll(requestedPage);

        return ResponseEntity.ok(productDTOs);
    }

    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@Valid @RequestBody ProductDTO productDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.create(productDTO));
    }
}
