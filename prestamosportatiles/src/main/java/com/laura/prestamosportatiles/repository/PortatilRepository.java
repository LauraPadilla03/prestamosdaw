package com.laura.prestamosportatiles.repository;

import com.laura.prestamosportatiles.Portatil;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PortatilRepository extends JpaRepository<Portatil, Long> {
    List<Portatil> findByEstado(String estado);
}
