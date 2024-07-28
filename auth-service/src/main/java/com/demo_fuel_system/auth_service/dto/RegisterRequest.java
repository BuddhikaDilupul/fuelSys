package com.demo_fuel_system.auth_service.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    @NotBlank(message = "Username is mandatory")
    private String userName;
    @NotBlank(message = "Name is mandatory")
    private String name;
    @NotBlank(message = "Email is mandatory")
    private String email;
    @NotBlank(message = "Password is mandatory")
    private String password;
    @NotBlank(message = "Phone Number is mandatory")
    private String phoneNumber;
    @NotBlank(message = "Role is mandatory")
    private String role;
}
