---
title: Diagramas de Entidad Relación
---
El modelo entidad–relación del sistema representa la gestión de préstamos de portátiles entre usuarios y dispositivos. 

La entidad principal es Préstamo, que actúa como tabla intermedia entre Usuario y Portátil, permitiendo registrar qué usuario solicita cada dispositivo y en qué periodo. 

Cada usuario puede realizar múltiples préstamos, mientras que cada portátil puede estar asociado a distintos préstamos a lo largo del tiempo, lo que permite conservar el historial completo.

 Además, el estado del usuario se gestiona mediante un atributo de rol, diferenciando entre alumno y administrador dentro de la misma entidad.

```mermaid

erDiagram
    USUARIO ||--o{ PRESTAMO : realiza
    PORTATIL ||--o{ PRESTAMO : es_asignado
    
    USUARIO {
        bigint id PK
        varchar nombre
        varchar rol
        varchar password
    }
    
    PORTATIL {
        bigint id PK
        varchar codigo
        varchar estado
    }
    
    PRESTAMO {
        bigint id PK
        bigint usuario_id FK
        bigint portatil_id FK
        date fecha_inicio
        date fecha_fin
        varchar estado
    }
```
