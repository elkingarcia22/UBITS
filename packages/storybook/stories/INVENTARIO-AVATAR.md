# Inventario de Casos de Uso - Avatar

## Funcionalidades del Componente

1. **ImageUrl** (string, opcional)
   - URL de la imagen del avatar (para variante Photo)
   - Si se proporciona, se usa la variante Photo

2. **Initials** (string, opcional)
   - Texto para mostrar como iniciales (para variante Initials)
   - Ej: "JD" para "John Doe"
   - Se usa si no hay imageUrl

3. **Icon** (string, opcional)
   - Nombre del icono FontAwesome (para variante Icon)
   - Ej: "user", "user-circle"
   - Se usa si no hay imageUrl ni initials

4. **Size** ('xs' | 'sm' | 'md' | 'lg')
   - Tamaño del avatar (default: 'md')
   - xs: 20px, sm: 28px, md: 36px, lg: 40px

5. **BadgeColor** (string | null)
   - Color del badge (si se proporciona, se muestra el badge)
   - Opciones: 'green', 'red', 'blue', 'orange', 'gray'
   - Se mapea a variantes: success, error, info, warning, primary

6. **BadgeContent** (string | number | null)
   - Contenido del badge (número o texto)
   - Si no se proporciona, se muestra solo el punto (dot)
   - Ej: "5", "99+", "Nuevo"

7. **Alt** (string)
   - Texto alternativo para accesibilidad (solo para variante Photo)

8. **OnClick** (callback)
   - Callback cuando se hace clic en el avatar

9. **ClassName** (string)
   - Clases CSS adicionales

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Avatar completo con todos los controladores

2. **VariantPhoto**
   - Avatar con imagen (variante Photo)

3. **VariantInitials**
   - Avatar con iniciales (variante Initials)

4. **VariantIcon**
   - Avatar con icono (variante Icon)

5. **SizeXS**
   - Avatar tamaño extra small (20px)

6. **SizeSM**
   - Avatar tamaño small (28px)

7. **SizeMD**
   - Avatar tamaño medium (36px, default)

8. **SizeLG**
   - Avatar tamaño large (40px)

9. **WithBadgeDot**
   - Avatar con badge tipo dot (sin contenido)

10. **WithBadgeNumber**
    - Avatar con badge tipo number (con número)

11. **WithBadgeText**
    - Avatar con badge tipo text (con texto)

12. **BadgeColorGreen**
    - Badge color verde (success)

13. **BadgeColorRed**
    - Badge color rojo (error)

14. **BadgeColorBlue**
    - Badge color azul (info)

15. **BadgeColorOrange**
    - Badge color naranja (warning)

16. **BadgeColorGray**
    - Badge color gris (primary)

17. **WithoutBadge**
    - Avatar sin badge

18. **PhotoWithBadge**
    - Avatar con imagen y badge

19. **InitialsWithBadge**
    - Avatar con iniciales y badge

20. **IconWithBadge**
    - Avatar con icono y badge

21. **OnClickCallback**
    - Avatar con callback onClick

22. **CustomIcon**
    - Avatar con icono personalizado

23. **LongInitials**
    - Avatar con iniciales largas

24. **ShortInitials**
    - Avatar con iniciales cortas

25. **AllSizesPhoto**
    - Todos los tamaños con imagen

26. **AllSizesInitials**
    - Todos los tamaños con iniciales

27. **AllSizesIcon**
    - Todos los tamaños con icono

28. **AllBadgeColors**
    - Todos los colores de badge

29. **CompleteExample**
    - Ejemplo completo con todas las opciones

30. **MinimalExample**
    - Ejemplo mínimo

