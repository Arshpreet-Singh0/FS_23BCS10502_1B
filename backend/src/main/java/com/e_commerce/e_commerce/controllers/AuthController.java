package com.e_commerce.e_commerce.controllers;

import com.e_commerce.e_commerce.advices.ApiResponse;
import com.e_commerce.e_commerce.dto.LoginDTO;
import com.e_commerce.e_commerce.dto.SignUpDTO;
import com.e_commerce.e_commerce.dto.UserDTO;
import com.e_commerce.e_commerce.services.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<UserDTO> signup(@Valid @RequestBody SignUpDTO signUpDTO) {
        UserDTO userDTO =  authService.signUp(signUpDTO);
        return new ResponseEntity<>(userDTO, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<?>> login(@Valid @RequestBody LoginDTO loginDTO,
                                             HttpServletResponse response) {
        String token = authService.login(loginDTO);
        Cookie cookie = new Cookie("token", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        response.addCookie(cookie);

        return ResponseEntity.ok(new ApiResponse<>(token));
    }

}
