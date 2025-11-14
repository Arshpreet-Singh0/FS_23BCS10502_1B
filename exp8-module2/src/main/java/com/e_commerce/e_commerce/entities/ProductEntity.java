package com.e_commerce.e_commerce.entities;

import com.e_commerce.e_commerce.entities.enums.Categories;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(
        name = "Product"
//        uniqueConstraints = {
//                @UniqueConstraint(name = "unique_title", columnNames = {"title"})
//        }
)
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    private BigDecimal discount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "main_category")
    private Categories mainCategory;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "category")
    private Categories category;


    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private String imageUrl;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CartEntity> cart;
}
