package com.samLibrary.samLibrary.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Pattern;

public class UUIDValidator implements ConstraintValidator<ValidUUID, String> {
    private static final String UUID_PATTERN = "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$";
    private Pattern pattern = Pattern.compile(UUID_PATTERN);

    @Override
    public void initialize(ValidUUID constraintAnnotation) {
    }

    @Override
    public boolean isValid(String uuid, ConstraintValidatorContext context) {
        if (uuid == null) {
            return false;
        }
        return pattern.matcher(uuid).matches();
    }
}