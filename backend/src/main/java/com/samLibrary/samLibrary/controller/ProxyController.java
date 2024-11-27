package com.samLibrary.samLibrary.controller;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.io.InputStream;
import java.net.URL;

@RestController
public class ProxyController {

    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/proxy")
    public void proxy(@RequestParam("url") String url, HttpServletResponse response) {
        try {
            URL imageUrl = new URL(url);
            try (InputStream inputStream = imageUrl.openStream()) {
                response.setContentType("image/jpeg");
                inputStream.transferTo(response.getOutputStream());
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }
}