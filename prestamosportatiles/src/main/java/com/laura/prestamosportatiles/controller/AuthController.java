package com.laura.prestamosportatiles.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.laura.prestamosportatiles.Usuario;
import com.laura.prestamosportatiles.repository.UsuarioRepository;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario request) {

        Usuario user = usuarioRepository.findByNombre(request.getNombre());

        if (user == null) {
            return ResponseEntity.status(401).body("Usuario no existe");
        }

        if (!user.getPassword().equals(request.getPassword())) {
            return ResponseEntity.status(401).body("Password incorrecta");
        }

        return ResponseEntity.ok(user);
    }
}