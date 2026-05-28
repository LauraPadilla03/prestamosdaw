---
title: Diagrama de Casos de Prueba
---
El diagrama de casos de prueba representa el conjunto de escenarios utilizados para validar el correcto funcionamiento del sistema de gestión de préstamos de portátiles.

 Cada caso de prueba define una acción concreta, junto con las condiciones de entrada y el resultado esperado, permitiendo comprobar que las funcionalidades del sistema se comportan según lo especificado. 
 
 Estos casos cubren operaciones como el inicio de sesión, la solicitud y devolución de portátiles, la consulta del historial y las acciones administrativas, garantizando así la fiabilidad y consistencia del sistema en distintos flujos de uso.


```mermaid
flowchart LR

subgraph CP1["Login"]
  A1[Credenciales válidas] --> B1[Acceso concedido]
end

subgraph CP2["Solicitar portátil"]
  A2[Portátil disponible] --> B2[Préstamo creado]
end

subgraph CP3["Devolver portátil"]
  A3[Préstamo activo] --> B3[Estado actualizado a DEVUELTO]
end

subgraph CP4["Admin - devolución"]
  A4[Administrador selecciona préstamo] --> B4[Devolución forzada]
end
```