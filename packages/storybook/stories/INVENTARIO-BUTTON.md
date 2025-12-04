# Inventario de Casos de Uso - Button

## Funcionalidades del Componente

1. **Variant** ('primary' | 'secondary' | 'tertiary')
   - Variante del botón (default: 'primary')

2. **Size** ('xs' | 'sm' | 'md' | 'lg' | 'xl')
   - Tamaño del botón (default: 'md')

3. **Text** (string)
   - Texto del botón

4. **Icon** (string)
   - Nombre del icono FontAwesome (sin prefijo 'fa-')
   - Ej: 'check' para 'fa-check'

5. **IconStyle** ('regular' | 'solid')
   - Estilo del icono FontAwesome (default: 'regular')

6. **IconOnly** (boolean)
   - Solo icono, sin texto (default: false)

7. **IconPosition** ('left' | 'right')
   - Posición del icono (default: 'left')

8. **Disabled** (boolean)
   - Botón deshabilitado (default: false)

9. **Loading** (boolean)
   - Estado de carga (muestra spinner) (default: false)

10. **LoadingText** (string)
    - Texto durante loading

11. **Badge** (boolean)
    - Mostrar badge de notificación (default: false)

12. **Active** (boolean)
    - Modificador active/outline (fondo transparente + overlay azul) (default: false)

13. **Floating** (boolean)
    - Modificador floating (botón flotante con sombra) (default: false)

14. **FullWidth** (boolean)
    - Ancho completo (default: false)

15. **Block** (boolean)
    - Display block (default: false)

16. **Dropdown** (boolean)
    - Activar funcionalidad dropdown (muestra lista al hacer click) (default: false)

17. **DropdownOptions** (array)
    - Opciones para el dropdown (items de la lista)
    - Array de { label: string, value?: string, onClick?: function }

18. **ShowTooltip** (boolean)
    - Mostrar tooltip al hacer hover (solo para botones icon-only) (default: false)

19. **TooltipText** (string)
    - Texto del tooltip (solo para botones icon-only)

20. **OnClick** (callback)
    - Handler de click

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Button completo con todos los controladores

2. ✅ **ActiveState** (Ya existe)
   - Estado Active con nuevo fondo bg-active-button

3. **VariantPrimary**
   - Botón variante primary

4. **VariantSecondary**
   - Botón variante secondary

5. **VariantTertiary**
   - Botón variante tertiary

6. **SizeXS**
   - Botón tamaño extra small

7. **SizeSM**
   - Botón tamaño small

8. **SizeMD**
   - Botón tamaño medium (default)

9. **SizeLG**
   - Botón tamaño large

10. **SizeXL**
    - Botón tamaño extra large

11. **WithIconLeft**
    - Botón con icono a la izquierda

12. **WithIconRight**
    - Botón con icono a la derecha

13. **IconOnly**
    - Botón solo icono (sin texto)

14. **IconStyleRegular**
    - Icono estilo regular (far)

15. **IconStyleSolid**
    - Icono estilo solid (fas)

16. **Disabled**
    - Botón deshabilitado

17. **Loading**
    - Botón en estado de carga (con spinner)

18. **LoadingWithText**
    - Botón loading con texto personalizado

19. **WithBadge**
    - Botón con badge de notificación

20. **Active**
    - Botón con estado active

21. **Floating**
    - Botón flotante con sombra

22. **FullWidth**
    - Botón ancho completo

23. **Block**
    - Botón display block

24. **WithDropdown**
    - Botón con dropdown

25. **DropdownWithOptions**
    - Botón dropdown con opciones personalizadas

26. **IconOnlyWithTooltip**
    - Botón icon-only con tooltip

27. **OnClickCallback**
    - Botón con callback onClick

28. **AllVariants**
    - Todas las variantes

29. **AllSizes**
    - Todos los tamaños

30. **AllIconPositions**
    - Todas las posiciones de icono

31. **CompleteExample**
    - Ejemplo completo con todas las opciones

32. **MinimalExample**
    - Ejemplo mínimo

