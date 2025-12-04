# Inventario de Casos de Uso - Text Metric Card

## Funcionalidades del Componente

1. **Title** (string)
   - Título de la métrica (requerido)

2. **Value** (string | number)
   - Valor principal (puede ser número o string, ej: "200 / 204")
   - Si es número, se formatea con separadores de miles

3. **Label** (string)
   - Texto descriptivo debajo del valor

4. **TitleIcon** (string)
   - Icono opcional para el título (nombre de FontAwesome sin prefijo 'fa-')

5. **TitleIconStyle** ('regular' | 'solid')
   - Estilo del icono del título (default: 'regular')

6. **TitleIconColor** (string)
   - Color del icono del título (usando tokens UBITS)

7. **ShowInfoIcon** (boolean)
   - Mostrar icono de información junto al título (default: false)

8. **ShowActionButton** (boolean)
   - Mostrar botón de acción con flecha a la derecha (default: false)

9. **Size** ('sm' | 'md' | 'lg')
   - Tamaño de la tarjeta (default: 'md')

10. **OnClick** (callback)
    - Handler de click en la tarjeta

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Text Metric Card completo con todos los controladores

2. **SizeSM**
   - Tamaño small

3. **SizeMD**
   - Tamaño medium (default)

4. **SizeLG**
   - Tamaño large

5. **WithTitleIcon**
   - Con icono en el título

6. **WithoutTitleIcon**
   - Sin icono en el título

7. **TitleIconStyleRegular**
   - Icono del título estilo regular

8. **TitleIconStyleSolid**
   - Icono del título estilo solid

9. **WithTitleIconColor**
   - Con color personalizado para el icono del título

10. **WithInfoIcon**
    - Con icono de información

11. **WithoutInfoIcon**
    - Sin icono de información

12. **WithActionButton**
    - Con botón de acción

13. **WithoutActionButton**
    - Sin botón de acción

14. **ValueNumber**
    - Valor como número (se formatea automáticamente)

15. **ValueString**
    - Valor como string (ej: "200 / 204")

16. **ValueLargeNumber**
    - Valor numérico grande (se formatea con separadores de miles)

17. **ValueSmallNumber**
    - Valor numérico pequeño

18. **ValueZero**
    - Valor cero

19. **LongTitle**
    - Título largo

20. **ShortTitle**
    - Título corto

21. **LongLabel**
    - Label largo

22. **ShortLabel**
    - Label corto

23. **OnClickCallback**
    - Con callback onClick

24. **AllSizes**
    - Todos los tamaños

25. **AllIconStyles**
    - Todos los estilos de icono

26. **CompleteExample**
    - Ejemplo completo con todas las opciones

27. **MinimalExample**
    - Ejemplo mínimo

