# Inventario de Casos de Uso - Contenedor

## Funcionalidades del Componente

1. **Background Variant** ('bg1' | 'bg2' | 'bg3' | 'bg4')
   - Variante de fondo del contenedor usando tokens UBITS

2. **Show Border** (boolean)
   - Mostrar/ocultar borde visual (opcional, solo para demostración)

3. **Content** (string)
   - Contenido del contenedor (texto personalizable)

4. **Características fijas:**
   - Padding: 12px (var(--p-spacing-mode-1-md, 12px))
   - Border-radius: 8px
   - Usa tokens UBITS para colores, tipografía y espaciado
   - Responsive

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Contenedor básico con fondo bg1

2. **BackgroundVariant1**
   - Contenedor con fondo bg1 (default)

3. **BackgroundVariant2**
   - Contenedor con fondo bg2

4. **BackgroundVariant3**
   - Contenedor con fondo bg3

5. **BackgroundVariant4**
   - Contenedor con fondo bg4

6. **WithBorder**
   - Contenedor con borde visible

7. **WithoutBorder**
   - Contenedor sin borde (default)

8. **ShortContent**
   - Contenedor con contenido corto

9. **LongContent**
   - Contenedor con contenido largo (prueba de wrap)

10. **EmptyContent**
    - Contenedor vacío o con contenido mínimo

11. **RichContent**
    - Contenedor con contenido rico (múltiples párrafos, listas, etc.)

12. **NestedContainers**
    - Contenedores anidados (contenedor dentro de contenedor)

13. **MultipleContainers**
    - Múltiples contenedores en un layout

14. **ResponsiveExample**
    - Contenedor responsive (diferentes tamaños)

15. **CompleteExample**
    - Contenedor completo con todas las opciones configuradas

