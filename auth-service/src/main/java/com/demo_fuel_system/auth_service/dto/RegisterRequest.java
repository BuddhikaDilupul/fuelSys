package com.demo_fuel_system.auth_service.dto;

import com.demo_fuel_system.auth_service.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String userName;
    private String name;
    private String email;
    private String password;
    private String phoneNumber;
    private Role role;
}
