package com.e_commerce.e_commerce.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SignUpDTO {

    @NotBlank(message = "Name is required.")
    @Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters.")
    private String name;

    @NotBlank(message = "Email is required.")
    @Email(message = "Email must be in correct format.")
    private String email;


    @NotBlank(message = "Password is required.")
    private String password;
}
