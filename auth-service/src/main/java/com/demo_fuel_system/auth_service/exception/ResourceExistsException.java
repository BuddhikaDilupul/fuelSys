package com.demo_fuel_system.auth_service.exception;

public class ResourceExistsException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public ResourceExistsException(String message) {
        super(message);
    }
}
