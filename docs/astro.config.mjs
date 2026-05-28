import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Mi Documentación',
      customCss: [
        './src/styles/custom.css'
      ],
      sidebar: [
        {
          label: 'Proyecto',
          items: [
            { label: 'Introducción', link: 'introduccion' },
            { label: 'Guía de Instalación', link: 'instalacion' },
            { label: 'Guía de Uso', link: 'uso' },
            { label: 'Acceso', link: 'acceso' } 
          ]
        },
        {
          label: 'Documentación Técnica',
          items: [
           
            { label: 'Casos de uso', link: 'diagramas/02-casos-de-uso' },
            { label: 'Casos de prueba', link: 'diagramas/05-casos-de-prueba' },
            { label: 'Arquitectura', link: 'arquitectura' },
            { label: 'Diagrama de clases', link: 'diagramas/03-diagrama-clases' },
            { label: 'Modelo ER', link: 'diagramas/04-entidad-relacion' },
            { label: 'Sistema', link: 'diagramas/diagramas' }
          ]
        }
      ]
    }),
    mermaid({
      theme: 'forest',
      autoTheme: true,
      mermaidConfig: {
        flowchart: {
          curve: 'basis'
        }
      }
    })
  ]
});