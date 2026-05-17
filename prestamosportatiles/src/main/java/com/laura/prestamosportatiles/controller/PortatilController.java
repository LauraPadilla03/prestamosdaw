package com.laura.prestamosportatiles.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.laura.prestamosportatiles.Portatil;
import com.laura.prestamosportatiles.repository.PortatilRepository;

@RestController
@RequestMapping("/portatiles")
public class PortatilController {

    @Autowired
    private PortatilRepository portatilRepository;

    // GET → ver todos los portátiles
    @GetMapping
    public List<Portatil> getPortatiles() {
        return portatilRepository.findAll();
    }

    // POST → crear portátil
    @PostMapping
    public Portatil crearPortatil(@RequestBody Portatil portatil) {
        return portatilRepository.save(portatil);
    }

   
    @PutMapping("/{id}/devolver")
    public Portatil devolverPortatil(@PathVariable Long id) {

        Portatil portatil = portatilRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Portátil no encontrado"));

        portatil.setEstado("DISPONIBLE");

        return portatilRepository.save(portatil);
    }
}