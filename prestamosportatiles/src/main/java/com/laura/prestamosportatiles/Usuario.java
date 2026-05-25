package com.laura.prestamosportatiles;

import jakarta.persistence.*;

@Entity
public class Usuario {

    // Identificador único del usuario (clave primaria)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Nombre del usuario utilizado para identificación y login
    private String nombre;

    // Rol del usuario dentro del sistema (ALUMNO / ADMIN)
    private String rol;

    // Contraseña del usuario (almacenada en base de datos)
    private String password;

    // Constructor vacío requerido por JPA
    public Usuario() {
    }

    // Getter del ID
    public Long getId() {
        return id;
    }

    // Getter del nombre del usuario
    public String getNombre() {
        return nombre;
    }

    // Setter del nombre del usuario
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    // Getter del rol del usuario
    public String getRol() {
        return rol;
    }

    // Setter del rol del usuario
    public void setRol(String rol) {
        this.rol = rol;
    }

    // Getter de la contraseña del usuario
    public String getPassword() {
        return password;
    }

    // Setter de la contraseña del usuario
    public void setPassword(String password) {
        this.password = password;
    }
}