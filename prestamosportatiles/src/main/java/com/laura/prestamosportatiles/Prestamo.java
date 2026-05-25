package com.laura.prestamosportatiles;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class Prestamo {

    // Identificador único del préstamo (clave primaria)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relación muchos préstamos -> un usuario
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    // Relación muchos préstamos -> un portátil
    @ManyToOne
    @JoinColumn(name = "portatil_id")
    private Portatil portatil;

    // Fecha de inicio del préstamo
    private LocalDate fechaInicio;

    // Fecha de fin del préstamo
    private LocalDate fechaFin;

    // Estado del préstamo: ACTIVO o DEVUELTO
    private String estado;

    // Constructor vacío requerido por JPA
    public Prestamo() {
    }

    // Getter del ID
    public Long getId() {
        return id;
    }

    // Getter del usuario asociado al préstamo
    public Usuario getUsuario() {
        return usuario;
    }

    // Setter del usuario
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    // Getter del portátil asociado al préstamo
    public Portatil getPortatil() {
        return portatil;
    }

    // Setter del portátil
    public void setPortatil(Portatil portatil) {
        this.portatil = portatil;
    }

    // Getter de fecha de inicio
    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    // Setter de fecha de inicio
    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    // Getter de fecha de fin
    public LocalDate getFechaFin() {
        return fechaFin;
    }

    // Setter de fecha de fin
    public void setFechaFin(LocalDate fechaFin) {
        this.fechaFin = fechaFin;
    }

    // Getter del estado del préstamo
    public String getEstado() {
        return estado;
    }

    // Setter del estado del préstamo
    public void setEstado(String estado) {
        this.estado = estado;
    }
}