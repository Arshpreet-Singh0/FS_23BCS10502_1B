package com.e_commerce.e_commerce.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginDTO {

    @NotBlank(message = "Email is required.")
    @Email(message = "Email must be in correct format.")
    private String email;

    @NotBlank(message = "Password is required.")
    private String password;
}
