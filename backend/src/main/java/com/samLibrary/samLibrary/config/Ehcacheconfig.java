package com.samLibrary.samLibrary.config;

import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ExpiryPolicyBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.jsr107.Eh107Configuration;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.cache.CacheManager;
import javax.cache.Caching;
import java.time.Duration;

@Configuration
@EnableCaching
public class Ehcacheconfig {
    @Bean(name = "ehCacheManager")
    public CacheManager cacheManager() {
        org.ehcache.config.CacheConfiguration<Object, Object> cacheConfiguration = CacheConfigurationBuilder
                .newCacheConfigurationBuilder(Object.class, Object.class, ResourcePoolsBuilder.heap(100))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofMinutes(10)))
                .build();

        javax.cache.configuration.Configuration<Object, Object> configuration = Eh107Configuration.fromEhcacheCacheConfiguration(cacheConfiguration);

        CacheManager cacheManager = Caching.getCachingProvider().getCacheManager();
        cacheManager.createCache("books", configuration);

        return cacheManager;
    }
}
