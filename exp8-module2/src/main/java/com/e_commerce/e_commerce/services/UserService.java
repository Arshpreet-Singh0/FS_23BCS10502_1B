package com.e_commerce.e_commerce.services;

import com.e_commerce.e_commerce.dto.UserDTO;
import com.e_commerce.e_commerce.entities.UserEntity;
import com.e_commerce.e_commerce.repositories.UserEntityRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserEntityRepository userEntityRepository;
    private final ModelMapper modelMapper;

    @Override
    public UserDetails loadUserByUsername(String email) throws BadCredentialsException {
        return userEntityRepository.findByEmail(email).orElseThrow(() -> new BadCredentialsException("Email id not found"));
    }

    public UserEntity findById(Long id) {
        return userEntityRepository.findById(id)
                .orElseThrow(() -> new BadCredentialsException("User not found"));
    }



    public UserDTO findUserProfile() {

        UserEntity user = (UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        UserEntity userEntity = userEntityRepository.findById(user.getId())
                .orElseThrow(() -> new BadCredentialsException("User not found"));

        return  modelMapper.map(userEntity, UserDTO.class);
    }
}
