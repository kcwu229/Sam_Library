package com.samLibrary.samLibrary.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class ProtectionController {

    @GetMapping("/api/oauth/login")
    public String login() {
        return "redirect:/api/auth/oauth2/authorize/google";
    }
}