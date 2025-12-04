# Inventario de Casos de Uso - Segment Control

## Funcionalidades del Componente

1. **Segments** (SegmentItem[])
   - Array de segmentos a mostrar
   - Cada segmento tiene: id, label, icon (opcional), active (opcional), url (opcional), onClick (opcional), disabled (opcional)

2. **ActiveSegmentId** (string)
   - ID del segmento activo (opcional, si no se proporciona se usa el primer segmento con active: true)

3. **OnSegmentChange** (function)
   - Callback cuando cambia el segmento activo

4. **Icon Behavior**
   - Active: icono solid (fas), texto en negrita, fondo blanco
   - Inactive: icono regular (far), texto en gris claro, sin fondo

5. **Segment States**
   - Active: fondo blanco, icono solid oscuro, texto en negrita
   - Inactive: sin fondo, icono regular, texto en gris claro
   - Disabled: no clickeable

6. **Navigation**
   - Con URL: navegación directa
   - Con onClick: callback personalizado
   - Sin URL ni onClick: solo cambio visual

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Segment Control completo con todos los controladores

2. **WithIcons**
   - Con iconos

3. **WithoutIcons**
   - Sin iconos

4. **ActiveSegment**
   - Con segmento activo

5. **NoActiveSegment**
   - Sin segmento activo (usa el primero por defecto)

6. **DisabledSegment**
   - Con segmento deshabilitado

7. **AllSegmentsDisabled**
   - Todos los segmentos deshabilitados

8. **SegmentWithURL**
   - Segmento con URL (navegación)

9. **SegmentWithOnClick**
   - Segmento con onClick (callback)

10. **SegmentWithoutURLOrOnClick**
    - Segmento sin URL ni onClick (solo cambio visual)

11. **OnSegmentChangeCallback**
    - Callback cuando cambia el segmento activo

12. **FewSegments**
    - Pocos segmentos (2-3)

13. **ManySegments**
    - Muchos segmentos (8-10)

14. **SingleSegment**
    - Un solo segmento

15. **LongLabels**
    - Labels largos

16. **ShortLabels**
    - Labels cortos

17. **IconActiveSolid**
    - Icono activo (solid)

18. **IconInactiveRegular**
    - Icono inactivo (regular)

19. **MixedSegments**
    - Segmentos mixtos (algunos con iconos, algunos sin)

20. **CompleteExample**
    - Ejemplo completo

21. **MinimalExample**
    - Ejemplo mínimo

