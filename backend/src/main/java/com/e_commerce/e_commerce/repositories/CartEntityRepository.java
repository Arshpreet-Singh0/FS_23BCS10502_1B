package com.e_commerce.e_commerce.repositories;

import com.e_commerce.e_commerce.entities.CartEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartEntityRepository extends JpaRepository<CartEntity, Long> {

    @Query("SELECT c FROM CartEntity c LEFT JOIN FETCH c.product WHERE c.user.id = :userId")
    List<CartEntity> findByUserId(@Param("userId") Long userId);

    void deleteByIdAndUserId(Long id, Long userId);

}