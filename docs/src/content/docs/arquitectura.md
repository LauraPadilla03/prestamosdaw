---
title: Arquitectura
---

## Diagrama de Despliegue 


La aplicación está distribuida en tres servicios independientes que se comunican entre sí:

```mermaid
graph TD
    User((Usuario)) -->|HTTPS| Frontend[Vercel: Frontend React]
    Frontend -->|API REST| Backend[Render: Backend Spring Boot]
    Backend -->|SQL| DB[(Railway: MySQL)]

    