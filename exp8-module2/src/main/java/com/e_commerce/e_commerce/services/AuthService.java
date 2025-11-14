package com.e_commerce.e_commerce.services;

import com.e_commerce.e_commerce.dto.LoginDTO;
import com.e_commerce.e_commerce.dto.SignUpDTO;
import com.e_commerce.e_commerce.dto.UserDTO;
import com.e_commerce.e_commerce.entities.UserEntity;
import com.e_commerce.e_commerce.repositories.UserEntityRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

import static com.e_commerce.e_commerce.entities.enums.Roles.USER;

@Service
@AllArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserEntityRepository userEntityRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

    public String login(LoginDTO loginDTO) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword())
        );

        UserEntity user = (UserEntity) authentication.getPrincipal();

        return jwtService.generateToken(user);
    }

    public UserDTO signUp(SignUpDTO signUpDTO) {

        boolean isExists = userEntityRepository.findByEmail(signUpDTO.getEmail()).isPresent();

        if(isExists){
            throw new BadCredentialsException("Email already exists");
        }
        UserEntity userToCreate = modelMapper.map(signUpDTO, UserEntity.class);
        userToCreate.setRoles(Set.of(USER.name()));
        userToCreate.setPassword(passwordEncoder.encode(userToCreate.getPassword()));

        UserEntity createdUser = userEntityRepository.save(userToCreate);
        return modelMapper.map(createdUser, UserDTO.class);
    }
}
