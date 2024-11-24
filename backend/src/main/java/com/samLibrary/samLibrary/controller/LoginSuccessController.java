package com.samLibrary.samLibrary.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginSuccessController {
    @GetMapping("/home")
    public String login() {
        return "successful login via oauth2 !";
    }
}
