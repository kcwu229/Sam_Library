package com.samLibrary.samLibrary.service.Impl;

import com.samLibrary.samLibrary.service.CacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;

@Service
public class CacheServiceImpl implements CacheService {

    @Autowired
    private CacheManager cacheManager;

    @Override
    public void clearCache(String cacheName) {
        cacheManager.getCache(cacheName).clear();
    }

}
