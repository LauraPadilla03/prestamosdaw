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

    @PostMapping
    public Prestamo crearPrestamo(@RequestBody Prestamo prestamo) {

        // 1. Buscar portátil disponible
        Portatil portatil = portatilRepository
                .findByEstado("DISPONIBLE")
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No hay portátiles disponibles"));

        // 2. Usuario fijo
        Usuario usuario = usuarioRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        prestamo.setUsuario(usuario);

        // 3. Asignar portátil
        prestamo.setPortatil(portatil);

        // 4. Guardar préstamo (CON fechas que vienen del frontend)
        Prestamo guardado = prestamoRepository.save(prestamo);

        // 5. Cambiar estado del portátil
        portatil.setEstado("PRESTADO");
        portatilRepository.save(portatil);

        // 6. devolver objeto completo
        return prestamoRepository.findById(guardado.getId()).get();
    }

    //  DEVOLVER PRÉSTAMO
    @PutMapping("/{id}/devolver")
    public Prestamo devolverPrestamo(@PathVariable Long id) {

        Prestamo p = prestamoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Préstamo no encontrado"));

        p.setEstado("DEVUELTO");

        Portatil portatil = p.getPortatil();
        portatil.setEstado("DISPONIBLE");
        portatilRepository.save(portatil);

        return prestamoRepository.save(p);
    }

    // 🟡 HISTORIAL DE PRÉSTAMOS POR USUARIO
    @GetMapping("/usuario/{id}")
    public List<Prestamo> getPrestamosPorUsuario(@PathVariable Long id) {

        return prestamoRepository.findByUsuarioId(id);
    }
}