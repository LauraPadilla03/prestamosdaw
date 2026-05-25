package com.laura.prestamosportatiles;

import jakarta.persistence.*;

@Entity
public class Portatil {

    // Identificador único de la entidad (clave primaria)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Código identificador del portátil (ej: aula, etiqueta, inventario)
    private String codigo;

    // Estado actual del portátil: DISPONIBLE o PRESTADO
    private String estado;

    // Constructor vacío requerido por JPA
    public Portatil() {}

    // Getter del ID
    public Long getId() {
        return id;
    }

    // Getter del código del portátil
    public String getCodigo() {
        return codigo;
    }

    // Setter del código del portátil
    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    // Getter del estado del portátil
    public String getEstado() {
        return estado;
    }

    // Setter del estado del portátil
    public void setEstado(String estado) {
        this.estado = estado;
    }
}