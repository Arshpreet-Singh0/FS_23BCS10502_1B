package com.e_commerce.e_commerce.annotations;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.Arrays;

public class ProductCategoryValidator implements ConstraintValidator<ProductCategoryValidation, String> {

    private Class<? extends Enum<?>> enumClass;

    @Override
    public void initialize(ProductCategoryValidation constraintAnnotation) {
        this.enumClass = constraintAnnotation.enumClass();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.isEmpty()) return false;

        return Arrays.stream(enumClass.getEnumConstants())
                .anyMatch(e -> e.name().equalsIgnoreCase(value));
    }
}
