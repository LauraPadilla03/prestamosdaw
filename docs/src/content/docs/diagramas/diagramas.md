---
title: Diagramas del sistema
---

## Arquitectura de Despliegue

Esta es la representación visual de la infraestructura de despliegue donde reside la aplicación:

```mermaid
graph TD
    User((Usuario)) -->|HTTPS| Frontend[Vercel: Frontend React]
    Frontend -->|API REST| Backend[Render: Backend Spring Boot]
    Backend -->|SQL| DB[(Railway: MySQL Workbench)]
    