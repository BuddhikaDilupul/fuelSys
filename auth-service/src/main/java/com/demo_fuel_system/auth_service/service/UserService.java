package com.demo_fuel_system.auth_service.service;

import com.demo_fuel_system.auth_service.config.JwtService;
import com.demo_fuel_system.auth_service.dto.AuthenticationRequest;
import com.demo_fuel_system.auth_service.dto.AuthenticationResponse;
import com.demo_fuel_system.auth_service.dto.RegisterRequest;
import com.demo_fuel_system.auth_service.entity.Role;
import com.demo_fuel_system.auth_service.entity.UserEntity;
import com.demo_fuel_system.auth_service.exception.InvalidInputException;
import com.demo_fuel_system.auth_service.exception.ResourceExistsException;
import com.demo_fuel_system.auth_service.exception.ResourceNotFoundException;
import com.demo_fuel_system.auth_service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        if (repository.findByEmail(request.getEmail()).isPresent()) {
            throw new ResourceExistsException(request.getEmail() + " is not available");
        }else {

            var user = UserEntity.builder()
                    .name(request.getName())
                    .userName(request.getUserName())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(Role.valueOf(request.getRole()))
                    .build();

            var savedUser = repository.save(user);

            var jwtToken = jwtService.generateToken(savedUser);
            return AuthenticationResponse.builder()
                    .accessToken(jwtToken)
                    .build();
        }
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        System.out.println("AuthenticationRequest: " + request);

        var user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + request.getEmail()));

        // Ensure password is not empty
        if (request.getPassword() == null || request.getPassword().isEmpty()) {
            throw new InvalidInputException("Password is empty");
        }

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        } catch (Exception e) {
            System.out.println("Authentication failed: " + e.getMessage());
            throw new InvalidInputException("Authentication failed: " + e.getMessage() );
        }

        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .build();
    }
}
