package com.e_commerce.e_commerce.controllers;

import com.e_commerce.e_commerce.dto.UserDTO;
import com.e_commerce.e_commerce.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserDTO> getUserProfile() {
        return new ResponseEntity<>(userService.findUserProfile(), HttpStatus.OK);
    }

}
