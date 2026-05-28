---
title: Diagrama de Casos de Uso (UML)
---

### Diagrama de Casos de Uso del Sistema de Préstamos


El diagrama de casos de uso representa las funcionalidades principales del sistema de préstamos de portátiles y la interacción de los distintos actores con dichas funcionalidades. En él se distinguen dos actores principales: el alumno y el administrador. 

El alumno puede iniciar sesión, cerrar sesión, solicitar un portátil, devolverlo y consultar su historial de préstamos. Por su parte, el administrador hereda todas las funcionalidades del alumno y además dispone de permisos adicionales que le permiten gestionar devoluciones de cualquier usuario y administrar el sistema de préstamos.

 Este diagrama permite visualizar de forma clara el comportamiento del sistema desde el punto de vista funcional y las acciones disponibles según el rol del usuario.


```mermaid
graph LR
 %% Actores
Alumno((Alumno))
Admin((Administrador))

%% Sistema
subgraph Sistema ["Sistema de Préstamos"]
    
    subgraph Basicas ["Acciones básicas"]
        Login[Login]
        Logout[Logout]
        Historial[Ver historial]
    end

    subgraph Prestamo ["Gestión de portátil"]
        Solicitar[Solicitar portátil]
        Devolver[Devolver portátil]
    end

    subgraph AdminExtra ["Funciones administrativas"]
        AdminDev[Gestionar devoluciones]
    end

end

%% Relaciones
Alumno --> Basicas
Alumno --> Prestamo

Admin --> Basicas
Admin --> Prestamo
Admin --> AdminExtra
