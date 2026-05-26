package com.laura.prestamosportatiles.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import java.util.Arrays;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        
        // 1. Permitir el envío de cookies/auth headers
        config.setAllowCredentials(true);
        
        // 2. DOMINIO EXACTO DE TU VERCEL (asegúrate de que sea la URL actual)
        config.setAllowedOrigins(Arrays.asList("https://prestamosdaw-bcg6dowkl-tfg-prestamos.vercel.app"));
        
        // 3. Permitir todos los headers y métodos para que el "preflight" (OPTIONS) pase
        config.setAllowedHeaders(Arrays.asList("*"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        
        // 4. Aplicar esta configuración a todas las rutas
        source.registerCorsConfiguration("/**", config);
        
        return new CorsFilter(source);
    }
}