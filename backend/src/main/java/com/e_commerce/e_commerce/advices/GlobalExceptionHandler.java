package com.e_commerce.e_commerce.advices;

import com.e_commerce.e_commerce.exceptions.ResourceNotFoundException;
import io.jsonwebtoken.JwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<?>> handleResourceNotFoundException(ResourceNotFoundException e) {
        ApiError apiError = ApiError.builder()
                .status(HttpStatus.NOT_FOUND)
                .message(e.getMessage())
                .build();
        return buildErrorResponseEntity(apiError);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<?>> handleInternalServerException(Exception e) {
        System.out.println(e);
        ApiError apiError = ApiError.builder()
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .message("Internal Server Error")
                .build();
        return buildErrorResponseEntity(apiError);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<?>> handleInputValidationErrors(MethodArgumentNotValidException exception){
        List<String> errors = exception.getBindingResult().getAllErrors().stream()
                .map(err -> err.getDefaultMessage())
                .collect(Collectors.toList());

        ApiError apiError = ApiError.builder().status(HttpStatus.BAD_REQUEST).message("Input validation failed.").subErrors(errors).build();
        return buildErrorResponseEntity(apiError);
    }

    @ExceptionHandler(org.springframework.security.core.AuthenticationException.class)
    public ResponseEntity<ApiResponse<?>> handleAuthenticationException(AuthenticationException ex) {
        ApiError apiError = ApiError.builder()
                .message(ex.getLocalizedMessage())
                .status(HttpStatus.UNAUTHORIZED)
                .build();

        return buildErrorResponseEntity(apiError);
    }

    @ExceptionHandler(JwtException.class)
    public ResponseEntity<ApiResponse<?>> handleJwtException(JwtException ex) {
        ApiError apiError = ApiError.builder()
                .message(ex.getLocalizedMessage())
                .status(HttpStatus.UNAUTHORIZED)
                .build();

        return buildErrorResponseEntity(apiError);
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ApiResponse<?>> handleNoResourceFoundException(NoResourceFoundException ex) {
        ApiError apiError = ApiError.builder()
                .message(ex.getLocalizedMessage())
                .status(HttpStatus.NOT_FOUND)
                .build();

        return buildErrorResponseEntity(apiError);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiResponse<?>> handleBadCredentials(BadCredentialsException ex) {
        ApiError apiError = ApiError.builder()
                .message(ex.getMessage())
                .status(HttpStatus.BAD_REQUEST)
                .build();
        return buildErrorResponseEntity(apiError);
    }



    private ResponseEntity<ApiResponse<?>> buildErrorResponseEntity(ApiError apiError) {
        return new ResponseEntity<>(new ApiResponse<>(apiError),HttpStatus.NOT_FOUND);
    }
}
