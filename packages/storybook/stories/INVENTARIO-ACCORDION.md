# Inventario de Casos de Uso - Accordion

## Funcionalidades del Componente

1. **Variantes**
   - `list`: Variante lista simple
   - `boxed`: Variante tipo caja

2. **Posición del Chevron**
   - `left`: Chevron a la izquierda
   - `right`: Chevron a la derecha (default)

3. **Múltiples Items Abiertos**
   - `allowMultiple: false`: Solo un item abierto a la vez (default)
   - `allowMultiple: true`: Múltiples items abiertos simultáneamente

4. **Items Abiertos por Defecto**
   - `defaultOpen`: Array de IDs de items que deben estar abiertos al cargar

5. **Iconos**
   - `showIcons: true`: Mostrar iconos (default)
   - `showIcons: false`: Ocultar iconos
   - `iconStyle: 'regular' | 'solid'`: Estilo del icono

6. **SubHeaders**
   - Items con `subHeader` opcional

## Casos de Uso a Documentar

1. ✅ **Interactive - All Controls** (Ya existe)
   - Historia con todos los controles para probar todas las variantes

2. **VariantList**
   - Accordion con variante `list` (lista simple)
   - Chevron a la derecha
   - Sin iconos
   - Solo un item abierto a la vez

3. **VariantBoxed**
   - Accordion con variante `boxed` (tipo caja)
   - Chevron a la derecha
   - Con iconos
   - Solo un item abierto a la vez

4. **ChevronLeft**
   - Accordion con chevron a la izquierda
   - Variante `list`
   - Con iconos
   - Solo un item abierto a la vez

5. **ChevronRight**
   - Accordion con chevron a la derecha (default)
   - Variante `list`
   - Con iconos
   - Solo un item abierto a la vez

6. **AllowMultiple**
   - Accordion con `allowMultiple: true`
   - Permite múltiples items abiertos simultáneamente
   - Variante `list`
   - Con iconos

7. **DefaultOpen**
   - Accordion con items abiertos por defecto
   - `defaultOpen: ['1', '3']`
   - Variante `list`
   - Con iconos

8. **WithIcons**
   - Accordion con iconos
   - `showIcons: true`
   - Iconos con estilo `regular`
   - Variante `list`

9. **WithoutIcons**
   - Accordion sin iconos
   - `showIcons: false`
   - Variante `list`

10. **IconStyleSolid**
    - Accordion con iconos estilo `solid`
    - `iconStyle: 'solid'`
    - Variante `list`

11. **WithSubHeaders**
    - Accordion con subheaders
    - Items con `subHeader` definido
    - Variante `list`
    - Con iconos

12. **BoxedWithSubHeaders**
    - Accordion variante `boxed` con subheaders
    - Items con `subHeader` definido
    - Con iconos

13. **BoxedChevronLeft**
    - Accordion variante `boxed` con chevron a la izquierda
    - Con iconos

14. **BoxedAllowMultiple**
    - Accordion variante `boxed` con `allowMultiple: true`
    - Con iconos

15. **BoxedDefaultOpen**
    - Accordion variante `boxed` con items abiertos por defecto
    - `defaultOpen: ['2', '4']`
    - Con iconos

