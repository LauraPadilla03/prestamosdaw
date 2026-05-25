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

    // Endpoint de login de usuario
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario request) {

        // Busca el usuario en la base de datos por nombre
        Usuario user = usuarioRepository.findByNombre(request.getNombre());

        // Si no existe el usuario, devuelve error 401 (no autorizado)
        if (user == null) {
            return ResponseEntity.status(401).body("Usuario no existe");
        }

        // Comprueba que la contraseña coincide
        if (!user.getPassword().equals(request.getPassword())) {
            return ResponseEntity.status(401).body("Password incorrecta");
        }

        // Si todo es correcto, devuelve el usuario autenticado
        return ResponseEntity.ok(user);
    }
}