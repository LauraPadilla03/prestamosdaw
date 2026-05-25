package com.laura.prestamosportatiles.controller;

import com.laura.prestamosportatiles.Usuario;
import com.laura.prestamosportatiles.Prestamo;
import com.laura.prestamosportatiles.Portatil;
import com.laura.prestamosportatiles.repository.PrestamoRepository;
import com.laura.prestamosportatiles.repository.PortatilRepository;
import com.laura.prestamosportatiles.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/prestamos")
public class PrestamoController {

    @Autowired
    private PrestamoRepository prestamoRepository;

    @Autowired
    private PortatilRepository portatilRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Crear un nuevo préstamo asignando un portátil disponible
    @PostMapping
    public Prestamo crearPrestamo(@RequestBody Prestamo prestamo) {

        // Obtener el primer portátil disponible
        Portatil portatil = portatilRepository
                .findByEstado("DISPONIBLE")
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No hay portátiles disponibles"));

        // Usuario fijo del sistema (hardcoded)
        Usuario usuario = usuarioRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Asignar usuario al préstamo
        prestamo.setUsuario(usuario);

        // Asignar portátil al préstamo
        prestamo.setPortatil(portatil);

        // Guardar préstamo en base de datos
        Prestamo guardado = prestamoRepository.save(prestamo);

        // Marcar portátil como prestado
        portatil.setEstado("PRESTADO");
        portatilRepository.save(portatil);

        // Devolver préstamo completo guardado
        return prestamoRepository.findById(guardado.getId()).get();
    }

    // Marcar un préstamo como devuelto
    @PutMapping("/{id}/devolver")
    public Prestamo devolverPrestamo(@PathVariable Long id) {

        // Buscar préstamo por ID
        Prestamo p = prestamoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Préstamo no encontrado"));

        // Cambiar estado del préstamo
        p.setEstado("DEVUELTO");

        // Recuperar portátil asociado
        Portatil portatil = p.getPortatil();

        // Marcar portátil como disponible
        portatil.setEstado("DISPONIBLE");
        portatilRepository.save(portatil);

        // Guardar cambios del préstamo
        return prestamoRepository.save(p);
    }

    // Obtener historial de préstamos de un usuario concreto
    @GetMapping("/usuario/{id}")
    public List<Prestamo> getPrestamosPorUsuario(@PathVariable Long id) {

        // Consulta al repositorio filtrando por usuario
        return prestamoRepository.findByUsuarioId(id);
    }
}