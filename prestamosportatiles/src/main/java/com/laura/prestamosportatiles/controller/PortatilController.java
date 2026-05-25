package com.laura.prestamosportatiles.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.laura.prestamosportatiles.repository.UsuarioRepository;

import java.util.List;

import com.laura.prestamosportatiles.Portatil;
import com.laura.prestamosportatiles.Usuario;
import com.laura.prestamosportatiles.repository.PortatilRepository;

@RestController
@RequestMapping("/portatiles")
public class PortatilController {

    @Autowired
    private PortatilRepository portatilRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;

    // GET → devuelve la lista completa de portátiles en base de datos
    @GetMapping
    public List<Portatil> getPortatiles() {
        return portatilRepository.findAll();
    }

    // POST → crea un nuevo portátil en el sistema
    @PostMapping
    public Portatil crearPortatil(@RequestBody Portatil portatil) {
        Usuario admin = usuarioRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!admin.getRol().equals("ADMIN")) {
            throw new RuntimeException("No autorizado");
        }
        return portatilRepository.save(portatil);
    }

    // PUT → marca un portátil como disponible (devolución)
    @PutMapping("/{id}/devolver")
    public Portatil devolverPortatil(@PathVariable Long id) {

        // Busca el portátil por ID o lanza error si no existe
        Portatil portatil = portatilRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Portátil no encontrado"));

        // Cambia el estado del portátil a disponible
        portatil.setEstado("DISPONIBLE");

        // Guarda el cambio en base de datos
        return portatilRepository.save(portatil);
    }
}