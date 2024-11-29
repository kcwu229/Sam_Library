package com.samLibrary.samLibrary.controller;

import com.samLibrary.samLibrary.service.CacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cache")
public class CacheController {

    @Autowired
    private CacheService cacheService;

    @PostMapping("/clear")
    public void clearCache(@RequestParam String cacheName) {
        cacheService.clearCache(cacheName);
    }
}