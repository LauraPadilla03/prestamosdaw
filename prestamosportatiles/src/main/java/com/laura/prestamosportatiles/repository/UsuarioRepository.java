package com.laura.prestamosportatiles.repository;

import com.laura.prestamosportatiles.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Usuario findByNombre(String nombre);

    Optional<Usuario> findByNombreAndPassword(String nombre, String password);
}