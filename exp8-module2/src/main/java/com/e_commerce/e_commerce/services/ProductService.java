package com.e_commerce.e_commerce.services;

import com.e_commerce.e_commerce.dto.ProductDTO;
import com.e_commerce.e_commerce.entities.ProductEntity;
import com.e_commerce.e_commerce.exceptions.ResourceNotFoundException;
import com.e_commerce.e_commerce.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;

    public ProductService(ProductRepository productRepository, ModelMapper modelMapper) {
        this.productRepository = productRepository;
        this.modelMapper = modelMapper;
    }

    public ProductDTO findById(long id) {
        ProductEntity productEntity = productRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Product not found with id " + id));

        return modelMapper.map(productEntity, ProductDTO.class);
    }


    public List<ProductDTO> findAll() {
        List<ProductEntity> productEntities = productRepository.findAll();
        return productEntities
                .stream()
                .map((product) -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());
    }

    public List<ProductDTO> findAll(Pageable page) {
        Page<ProductEntity> productEntities = productRepository.findAll(page);
        return productEntities.map(product -> modelMapper.map(product, ProductDTO.class)).getContent();
    }

    public ProductDTO create(ProductDTO productDTO) {
        ProductEntity productEntity = modelMapper.map(productDTO, ProductEntity.class);
        productEntity = productRepository.save(productEntity);
        return modelMapper.map(productEntity, ProductDTO.class);
    }

}
