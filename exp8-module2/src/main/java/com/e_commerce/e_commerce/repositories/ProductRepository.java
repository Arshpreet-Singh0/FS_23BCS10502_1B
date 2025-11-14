package com.e_commerce.e_commerce.repositories;

import com.e_commerce.e_commerce.entities.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<ProductEntity, Long> {


    Page<ProductEntity> findAll(Pageable page);
}