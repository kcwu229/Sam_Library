package com.samLibrary.samLibrary.service;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;

@Service
public class CacheService {

    @Caching(evict = {
            @CacheEvict(value = "authors", allEntries = true),
            @CacheEvict(value = "books", allEntries = true),
            @CacheEvict(value = "users", allEntries = true),
            @CacheEvict(value = "bookReview", allEntries = true),

    })
    public void clearCache() {
        // This method will clear the cache for "authors" and "books"
    }
}