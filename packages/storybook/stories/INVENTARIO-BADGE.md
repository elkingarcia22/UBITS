# Inventario de Casos de Uso - Badge

## Funcionalidades del Componente

1. **Type** ('dot' | 'number')
   - Tipo de badge: 'dot' (solo bolita sin número) o 'number' (con contenido)
   - Si no se especifica, se infiere de content (si hay content es 'number', sino 'dot')

2. **Content** (string | number | null)
   - Contenido del badge (número o texto)
   - Solo para tipo 'number'
   - Si no se proporciona o está vacío, se muestra solo el punto (dot)

3. **Size** ('xs' | 'sm' | 'md' | 'lg')
   - Tamaño del badge (default: 'md')

4. **Variant** ('primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info')
   - Variante de color (default: 'primary')

5. **Style** ('light' | 'neutral' | 'bold')
   - Estilo del badge:
   - 'light': badge y label sin borde
   - 'neutral': con borde gris
   - 'bold': fondo de color y texto blanco

6. **Absolute** (boolean)
   - Si el badge debe usar posición absoluta (default: false)

7. **Position** ('top-right' | 'top-left' | 'bottom-right' | 'bottom-left')
   - Posición cuando es absoluto (default: 'top-right')

8. **Label** (string)
   - Texto del label que aparece junto al badge

9. **ShowLabel** (boolean)
   - Mostrar u ocultar el label (default: false)

10. **LabelTypography** (string)
    - Clase de tipografía UBITS para el label
    - Opciones: 'ubits-body-sm-regular', 'ubits-body-sm-semibold', 'ubits-body-sm-bold', 'ubits-body-md-regular', 'ubits-body-md-semibold', 'ubits-body-md-bold', 'ubits-heading-h1', 'ubits-heading-h2'
    - Default: 'ubits-body-md-regular'

11. **ClassName** (string)
    - Clases CSS adicionales

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Badge completo con todos los controladores

2. **TypeDot**
   - Badge tipo dot (solo bolita sin número)

3. **TypeNumber**
   - Badge tipo number (con contenido)

4. **SizeXS**
   - Badge tamaño extra small

5. **SizeSM**
   - Badge tamaño small

6. **SizeMD**
   - Badge tamaño medium (default)

7. **SizeLG**
   - Badge tamaño large

8. **VariantPrimary**
   - Badge variante primary

9. **VariantSecondary**
   - Badge variante secondary

10. **VariantSuccess**
    - Badge variante success

11. **VariantWarning**
    - Badge variante warning

12. **VariantError**
    - Badge variante error

13. **VariantInfo**
    - Badge variante info

14. **StyleLight**
    - Badge estilo light (sin borde)

15. **StyleNeutral**
    - Badge estilo neutral (con borde gris)

16. **StyleBold**
    - Badge estilo bold (fondo de color y texto blanco)

17. **WithContentNumber**
    - Badge con contenido numérico

18. **WithContentText**
    - Badge con contenido de texto

19. **WithoutContent**
    - Badge sin contenido (solo dot)

20. **AbsolutePosition**
    - Badge con posición absoluta

21. **PositionTopRight**
    - Badge posición top-right (default)

22. **PositionTopLeft**
    - Badge posición top-left

23. **PositionBottomRight**
    - Badge posición bottom-right

24. **PositionBottomLeft**
    - Badge posición bottom-left

25. **WithLabel**
    - Badge con label

26. **WithoutLabel**
    - Badge sin label

27. **LabelTypographyVariants**
    - Badge con diferentes variantes de tipografía del label

28. **AllVariants**
    - Todos los colores de variante

29. **AllSizes**
    - Todos los tamaños

30. **AllStyles**
    - Todos los estilos

31. **AllPositions**
    - Todas las posiciones absolutas

32. **CompleteExample**
    - Ejemplo completo con todas las opciones

33. **MinimalExample**
    - Ejemplo mínimo

