package com.laura.prestamosportatiles;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    // Configuración global de CORS para la aplicación Spring Boot
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {

            @Override
            public void addCorsMappings(CorsRegistry registry) {

                // Permite CORS para todas las rutas del backend
                registry.addMapping("/**")
                        
                        // Permite peticiones desde cualquier origen (frontend)
                        .allowedOrigins("*")
                        
                        // Permite cualquier método HTTP (GET, POST, PUT, DELETE, etc.)
                        .allowedMethods("*");
            }
        };
    }
}