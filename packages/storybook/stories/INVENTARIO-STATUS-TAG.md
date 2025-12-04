# Inventario de Casos de Uso - Status Tag

## Funcionalidades del Componente

1. **Label** (string)
   - Texto del estado (requerido)

2. **Size** ('xs' | 'sm' | 'md')
   - Tamaño del tag (default: 'md')
   - XS: body-xs 11px, SM: body-sm 13px, MD: body-md 16px

3. **Status** (string)
   - Estado/variante del tag (determina el color)
   - Verde (success): 'completed', 'published', 'fulfilled', 'created', 'active'
   - Rojo (error): 'not-fulfilled', 'denied'
   - Azul (info): 'draft', 'in-progress', 'syncing'
   - Naranja/Amarillo (warning): 'pending', 'pending-approval'
   - Gris (neutral): 'not-started', 'finished', 'archived', 'disabled', 'paused', 'hidden'
   - Default: 'pending'

4. **LeftIcon** (string)
   - Icono izquierdo (nombre del icono FontAwesome sin el prefijo 'fa-')
   - Si no se especifica, no se muestra icono izquierdo

5. **RightIcon** (string | null)
   - Icono derecho (default: 'chevron-down')
   - Si es null o undefined, no se muestra icono derecho

6. **Clickable** (boolean)
   - Si el tag es clickeable (añade estilos hover/active y cursor pointer) (default: false)

7. **OnClick** (callback)
   - Función a ejecutar cuando se hace clic en el tag (solo si clickable es true)

8. **ClassName** (string)
   - Clases CSS adicionales

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Status Tag completo con todos los controladores

2. **SizeXS**
   - Status Tag tamaño extra small (11px)

3. **SizeSM**
   - Status Tag tamaño small (13px)

4. **SizeMD**
   - Status Tag tamaño medium (16px, default)

5. **StatusGreen**
   - Estados verdes (success): completed, published, fulfilled, created, active

6. **StatusRed**
   - Estados rojos (error): not-fulfilled, denied

7. **StatusBlue**
   - Estados azules (info): draft, in-progress, syncing

8. **StatusOrange**
   - Estados naranjas/amarillos (warning): pending, pending-approval

9. **StatusGray**
   - Estados grises (neutral): not-started, finished, archived, disabled, paused, hidden

10. **WithLeftIcon**
    - Status Tag con icono izquierdo

11. **WithRightIcon**
    - Status Tag con icono derecho

12. **WithBothIcons**
    - Status Tag con icono izquierdo y derecho

13. **WithoutIcons**
    - Status Tag sin iconos

14. **Clickable**
    - Status Tag clickeable

15. **OnClickCallback**
    - Status Tag con callback onClick

16. **AllSizes**
    - Todos los tamaños

17. **AllStatusGreen**
    - Todos los estados verdes

18. **AllStatusRed**
    - Todos los estados rojos

19. **AllStatusBlue**
    - Todos los estados azules

20. **AllStatusOrange**
    - Todos los estados naranjas

21. **AllStatusGray**
    - Todos los estados grises

22. **AllStatuses**
    - Todos los estados disponibles

23. **CompleteExample**
    - Ejemplo completo con todas las opciones

24. **MinimalExample**
    - Ejemplo mínimo

